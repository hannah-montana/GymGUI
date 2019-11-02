import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../../customer.service';
import { ProgramService } from '../../program.service';
import { User, Program, ProgramUser } from '../../gym.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

declare var $: any;

@Component({
  selector: 'app-coach-customer',
  templateUrl: './coach-customer.component.html',
  styleUrls: ['./coach-customer.component.css']
})
export class CoachCustomerComponent implements OnInit {

  rows: Array<User>;
  progrows: Array<Program>; //use in view
  progAllrows: Array<Program>; //use in assign


  myGroup: FormGroup;
  groupProgram: FormGroup;
  groupAllProgram: FormGroup;


  fnFilter: string; //function filter for program
  progFnFilter: string; //fn filter for view
  progAllFnFilter: string; // fn filter for create new


  listUsers: User[];
  listPrograms: Program[];
  listAllPrograms: Program[];

  /*view user*/
  user: User;

  alertContent: string;

  userInfo: string
  userId: string; //use for delete user

  icon: string
  iconText: string

  selectedProgram: string = '';
  currentUserId: string = '';
  coachId: string = '1';

  proUser: ProgramUser = null; //use for assign

  constructor(private customerService: CustomerService,
              private fb: FormBuilder,
              private programService: ProgramService,
              private fb2: FormBuilder,
              private fb3: FormBuilder) { }

  ngOnInit() {

     this.alertContent = '';

     //load customer grid
     this.loadCustomer();

     //filter session in view program
     this.programFilter();

     //all session filter
     this.allProgramFilter();
  }

  loadCustomer(){
    this.getAllCustomers().subscribe(data => {

      this.listUsers = data;

      this.rows = [...this.listUsers];

      this.userFnFilter();
    });
  } //ok


  getAllCustomers()
  {
    return this.customerService.getAllCustomers2();
  } //ok

  //customer filter in main component
  userFnFilter(){
    //program filter
    this.myGroup = this.fb.group({
      nameFC: ''
    });

    this.myGroup.get('nameFC').valueChanges
    .subscribe(val => {
      this.fnFilter = val;
      this.applyFnFilter();
    });
    }//ok

  applyFnFilter = () => {
    let rows2 = this.listUsers;

    if (!!this.fnFilter) {
      //rows3 = rows2.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase())); //startsWith
      rows2 = rows2.filter(r => r.lastName.toLowerCase().startsWith(this.fnFilter.toLowerCase()));
    }
    this.rows = rows2;
    //this.rows = rows3;
  }; //ok

  /******* VIEW *******/
  view(user){
    console.log(user);
    this.user = user;

    /*Get Program By User Id*/
    this.getProgramsByUserId(this.user.id);

    $("#viewModal").modal('show');
  }//ok

  hideView() {
    document.getElementById('close-modal').click();
  }//ok

  //get assigned program
  getProgramsByUserId(userId){
    this.programService.getProgramsByUserId2(userId)
      .subscribe(data => {
        this.listPrograms = data;
        this.progrows = [...this.listPrograms];

        //use for assign program list
        this.listAllPrograms = data;
        this.progAllrows = [...this.listAllPrograms];
       });
  }

  /******* end VIEW *******/

  /******  Assign Program******/

  check: string = '';
  disableAssign: boolean = false;
  assign(user){
    this.user = user;
    this.currentUserId = user.id;
    /*
      get program by userId
      if he/she haven't finish 1 program -> cannot assign
      else: load all program then assign one
    */
    let check = -1;
    this.programService.checkAssign(user.id).subscribe(data =>{
      this.check = data;
    });

    /* call 2 api so it need time to load */
    setTimeout(()=>{    //<<<---    using ()=> syntax
      if(this.check == '0') { //user haven't finish 1 program
        this.getProgramsByUserId(this.currentUserId);
        this.disableAssign = true;
      }
      else {
        //Get all program
        this.getAllPrograms();
        this.disableAssign = false;
      }
      $("#assignModal").modal('show');
    }, 500);

  }

  hideView2() {
    document.getElementById('close-modal-2').click();
  }

  //Select program (checkbox event) in assign form
  onSelect(e, id){
    if(e.target.checked){
      this.selectedProgram = id;
    }
    else{
      alert('ahihi');
    }
  }

  //assign Program to Customer
  save(){
    this.proUser = new ProgramUser();
    this.proUser.id = '0';
    this.proUser.coachId = this.coachId;
    this.proUser.progId = this.selectedProgram;
    this.proUser.userId = this.currentUserId;
    this.proUser.point = 0;
    this.proUser.isFinished = 'Not yet';

    //alert(this.currentUserId);
    this.programService.assignProgramToCustomer(this.proUser)
      .subscribe(data => {
        if(data == 1){
          this.hideView2();
          this.alertContent = 'Assign Successful!';
          this.icon = '';
          this.iconText = 'Success';
          this.viewAlert();
        }
        else{
          this.hideView2();
          this.alertContent = 'Error! Cannot assign';
          this.icon = 'warning';
          this.iconText = 'Warning';
          this.viewAlert();
        }
      });

  }
  /******  End Assign Program******/

  /*PROGRAM*/
  //program filter in view user
  programFilter(){
    //program filter
    this.groupProgram = this.fb2.group({
      progNameFC: ''
    });

    this.groupProgram.get('progNameFC').valueChanges
      .subscribe(val => {

      this.progFnFilter = val;
      this.applyFiltersProgram();
    });
  }//ok

  applyFiltersProgram = () => {
    let rows = this.listPrograms;

    if (!!this.progFnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.progFnFilter.toLowerCase())); //startsWith
    }
    this.progrows = rows;
  }/*ok*/

  //program filter in assign user
  allProgramFilter(){
    this.groupAllProgram = this.fb3.group({
      progAllFnFilter: ''
    });

    this.groupAllProgram.get('progAllFnFilter').valueChanges
    .subscribe(val => {

      this.progAllFnFilter = val;
      this.applyAllFiltersProgram();
    });
  } //ok

  applyAllFiltersProgram = () => {
    let rows = this.listAllPrograms;

    if (!!this.progAllFnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.progAllFnFilter.toLowerCase())); //startsWith
    }
    this.progAllrows = rows;
  }//ok

  /*View All program*/
  getAllPrograms()
  {
    this.programService.getAllPrograms()
      .subscribe(data => {
         this.listAllPrograms = data;

         this.progAllrows = [...this.listAllPrograms];
       });
  }


  /*END PROGRAM*/


  /********* ALERT *********/
  viewAlert(){
    $("#alertModal").modal('show');
  }

  hideAlert(){
    document.getElementById('close-alert').click();
  }
  /********* end ALERT *********/

}
