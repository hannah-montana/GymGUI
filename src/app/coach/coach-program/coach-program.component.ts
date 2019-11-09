import { Component, OnInit, Input } from '@angular/core';
import { ProgramService } from '../../program.service';
import { SessionService } from '../../session.service';
import { Program , Session} from '../../gym.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-coach-program',
  templateUrl: './coach-program.component.html',
  styleUrls: ['./coach-program.component.css']
})
export class CoachProgramComponent implements OnInit {

  rows: Array<Program>;
  sessrows: Array<Session>;
  sessAllrows: Array<Session>;

  myGroup: FormGroup;
  groupSession: FormGroup;
  groupAllSession: FormGroup;

  fnFilter: string; //function filter for program
  sessFnFilter: string; //fn filter for view
  sessAllFnFilter: string; // fn filter for create new

  listPrograms: Program[];
  listSessions: Session[];
  listAllSession: Session[];

  /* view program */
  prog: Program;

  /* add new Program */
  newProg: Program;

  //list select sessions for a program
  lstSelectedSession: string[];
  listSessIdByProgId: string[];

  alertContent: string;

  coachId: string
  icon: string
  iconText: string

  programInfo: string

  programId: string; //use for delete program

  constructor(private programService: ProgramService,
                private fb: FormBuilder,
                private sessionService: SessionService,
                private fb2: FormBuilder,
                private fb3: FormBuilder,
                private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != '1'){
      this.router.navigate(['/oops']);
    }
    else{
      this.alertContent = '';
      this.lstSelectedSession = [];

      //load program grid
      this.loadProgram();

      //filter session in view program
      this.sessionFilter();

      //all session filter
      this.allSessionFilter();
    }
  }


  loadProgram(){
    this.getAllPrograms().subscribe(data => {
      this.listPrograms = data;

      this.rows = [...this.listPrograms];
    });

    //program filter
    this.myGroup = this.fb.group({
      nameFC: ''
    });

    this.myGroup.get('nameFC').valueChanges
    .subscribe(val => {
      this.fnFilter = val;
      this.applyAllFilters();
    });
  } //ok


  /******** PROGRAM *********/
  getAllPrograms()
  {
    //return this.programService.getAllPrograms();
    return this.programService.getAllPrograms();
  } //ok

  applyAllFilters = () => {
    let rows2 = this.listPrograms;

    if (!!this.fnFilter) {
      //rows3 = rows2.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase())); //startsWith
      rows2 = rows2.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase()));
    }
    this.rows = rows2;
    //this.rows = rows3;
  }; //ok

  view(program){
    //alert(program.id);
    this.prog = program;

    this.getSessionsByProgId(this.prog.id).subscribe(data => {
      //this.listExercise = [...data];

      this.listSessions = data;

      this.sessrows = [...this.listSessions];
    });

    $("#viewModal").modal('show');
  }//ok

  hideView() {
    document.getElementById('close-modal').click();
  }//ok

  /*Add new Program*/
  add(){
    this.prog = new Program();
    this.newProg = new Program();
    this.getAllSessions().subscribe(data => {
    this.listAllSession = data;

    this.sessAllrows = [...this.listAllSession];
  });

  $("#addModal").modal('show');
  }//ok

  hideAdd(){
  document.getElementById('close-modal-add').click();
  }//ok

  onSubmit(form){
    //alert("1");
    if (form.value.name == null || form.value.name == ''){
      this.icon = 'warning';
      this.iconText = 'Warning';
      this.alertContent = 'Please input program name!';
      this.viewAlert();
    }
    else {
      if (this.prog.id != undefined){
        //update
        if(form.value.name != '') /* if don't check that condition, when edit but dont change any value -> it'll be fail */
          this.prog.name = form.value.name;
        if(form.value.description != '')
          this.prog.description = form.value.description;
      }
      else{
        //insert
        this.newProg = form.value;
        this.newProg.numberOfSession = this.lstSelectedSession.length;

        this.programService.saveProgram(this.newProg, this.lstSelectedSession, 1)
          .subscribe(data => {
            console.log("result: " + data);
            if(data == 1){
              this.hideAdd();
              //reload program grid
              this.loadProgram();

              this.coachId = '';

              this.alertContent = 'Create new program successful!';
              this.icon = '';
              this.iconText = 'Success';
              this.viewAlert();
            }
            else{
              this.alertContent = 'This program name existed!';
              this.viewAlert();
            }
          });
      }
    }
  }

  /*RESET*/
  reset(form){
    form.reset();
  }
  /*End Add new Program*/

  /*EDIT PROGRAM*/
  edit(program){
    this.prog = program;
    this.lstSelectedSession = [];
    this.listSessIdByProgId = [];

    //get session by program id
    this.getSessionsByProgId(this.prog.id).subscribe(data => {
      this.listSessions = data;
      //console.log(this.listExercise);
      for (var sess of this.listSessions) {
          //console.log(ex.id);
          this.listSessIdByProgId.push(sess.id);

      }
    });
    console.log(this.listSessIdByProgId);
    //initial assign in case user dont change anything, maybe I can remove later if it work well with grid checkbox
    this.lstSelectedSession = this.listSessIdByProgId;

    //get all session
    this.getAllSessions().subscribe(data => {
      this.listAllSession = data;

      this.sessAllrows = [...this.listAllSession];

      console.log(this.sessAllrows);

      console.log(this.sessAllrows);
    });

    $("#addModal").modal('show');
  }
  /*END EDIT PROGRAM*/

  /*delete program*/
  delete(program){
    this.programInfo = program.id + ' - ' + program.name;
    this.programId = program.id;

    $("#confirmDeleteModal").modal('show');
  }

  deleteProgram(){
      //process delete program
      this.hideConfirmDelete();
      //alert('start delete' + this.sessionId);
      this.programService.deleteProgram(this.programId)
        .subscribe(data => {
          console.log("deleted: " + data);
          if(data == 1){
            this.alertContent = 'Delete successful!';
            this.icon = 'warning';
            this.iconText = 'Warning';
            this.viewAlert();
            this.loadProgram();
          }
          else{
            this.alertContent = 'Error! Cannot delete this program!';
            this.icon = 'warning';
            this.iconText = 'Warning';
            this.viewAlert();
          }
      });
    }

  hideConfirmDelete(){
      document.getElementById('close-confirm-delete').click();
    }
  /*End delete program*/

  /******** end - PROGRAM *********/

  /******** SESSION *********/

  //session filter in view program
  sessionFilter(){
    //session filter
    this.groupSession = this.fb2.group({
      sessNameFC: ''
    });

    this.groupSession.get('sessNameFC').valueChanges
    .subscribe(val => {

      this.sessFnFilter = val;
      this.applyFiltersSession();
    });
  }//ok

  applyFiltersSession = () => {
    let rows = this.listSessions;

    if (!!this.sessFnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.sessFnFilter.toLowerCase())); //startsWith
    }
    this.sessrows = rows;
  }/*ok*/

   //session filter in create new program

  allSessionFilter(){
    this.groupAllSession = this.fb3.group({
      sessAllFnFilter: ''
    });

    this.groupAllSession.get('sessAllFnFilter').valueChanges
      .subscribe(val => {

      this.sessAllFnFilter = val;
      this.applyAllFiltersSession();
    });
  } //ok

  applyAllFiltersSession = () => {
    let rows = this.listAllSession;

    if (!!this.sessAllFnFilter) {
     rows = rows.filter(r => r.name.toLowerCase().startsWith(this.sessAllFnFilter.toLowerCase())); //startsWith
    }
    this.sessAllrows = rows;
  }//ok


   /*View All Session*/
  getAllSessions()
  {
    return this.sessionService.getAllSession();
  }

  getSessionsByProgId(progId){
     return this.sessionService.getSessionsByProgId2(progId);
  }

   //Select session (checkbox event) in create new program
  onSelect(e, id){
    if(e.target.checked){

      this.lstSelectedSession.push(id);
    }
    else{
     var index = this.lstSelectedSession.indexOf(id);
     if (index > -1) {
       this.lstSelectedSession.splice(index, 1);
     }
    }
  }

   /******** end - SESSION *********/

  /********* ALERT *********/
  viewAlert(){
    $("#alertModal").modal('show');
  }
  hideAlert(){
    document.getElementById('close-alert').click();
  }
  /********* end ALERT *********/

}
