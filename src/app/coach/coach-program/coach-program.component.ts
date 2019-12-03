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
  selectedSession: Array<Session> = [];
  selectedSessionRows: Array<Session>;

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

  sessIndex: number = 1;
  fcSession: Session = null;

  constructor(private programService: ProgramService,
                private fb: FormBuilder,
                private sessionService: SessionService,
                private fb2: FormBuilder,
                private fb3: FormBuilder,
                private router: Router) { }

  ngOnInit() {
    this.sessIndex = 1;
    if(localStorage.getItem('role') != '1'){
      this.router.navigate(['/oops']);
    }
    else{
      this.alertContent = '';
      this.lstSelectedSession = [];
      this.coachId = localStorage.getItem('id');

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
  }

  /******** PROGRAM *********/
  getAllPrograms()
  {
    //return this.programService.getAllPrograms();
    return this.programService.getAllPrograms();
  }

  applyAllFilters = () => {
    let rows2 = this.listPrograms;

    if (!!this.fnFilter) {
      //rows3 = rows2.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase())); //startsWith
      rows2 = rows2.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase()));
    }
    this.rows = rows2;
    //this.rows = rows3;
  };

  view(program){
    //alert(program.id);
    this.prog = program;

    this.getSessionsByProgId(this.prog.id).subscribe(data => {
      //this.listExercise = [...data];

      this.listSessions = data;

      this.sessrows = [...this.listSessions];
    });

    $("#viewModal").modal('show');
  }

  hideView() {
    document.getElementById('close-modal').click();
  }

  /*Add new Program*/
  add(){
    this.prog = new Program();
    this.newProg = new Program();
    this.listAllSession = [];
    this.sessAllrows = [];
    this.lstSelectedSession = [];
    this.selectedSession = [];
    this.selectedSessionRows = [];

    this.getAllSessions().subscribe(data => {
      this.listAllSession = data;
      this.sessAllrows = [...this.listAllSession];

      data[0].index = this.sessIndex;
      this.fcSession = data[0];
      this.selectedSession.push(this.fcSession);

      console.log(this.selectedSession);
      this.selectedSessionRows = [...this.selectedSession];
    });

    $("#addModal").modal('show');
  }

  hideAdd(){
  document.getElementById('close-modal-add').click();
  }

  onSubmit(form){
    //alert(this.prog.id);
    this.lstSelectedSession = [];

    if (this.prog.id != undefined ){
      //update
      if(form.value.name != '') /* if don't check that condition, when edit but dont change any value -> it'll be fail */
        this.prog.name = form.value.name;
      if(form.value.description != '')
        this.prog.description = form.value.description;

      console.log(this.selectedSession);

      for(var i = 0; i<this.selectedSession.length; i++){
        this.lstSelectedSession.push(this.selectedSession[i].id);
      }
      //check if the last item not the focus session -> add fcsession at tail
      if(this.selectedSession[this.selectedSession.length-1].focusSession != 1)
        this.lstSelectedSession.push(this.fcSession.id);

      this.prog.numberOfSession = this.lstSelectedSession.length;
      this.hideAdd();

      this.programService.updateProgram(this.prog, this.lstSelectedSession, this.coachId)
        .subscribe(data => {
          console.log("result: " + data);
          if(data == 1){
            //reload program grid
            this.loadProgram();
            //this.coachId = '';

            this.alertContent = 'Update program successful!';
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
    else{
      //insert
      if (form.value.name == null || form.value.name == ''){
        this.icon = 'warning';
        this.iconText = 'Warning';
        this.alertContent = 'Please input program name!';
        this.viewAlert();
      }
      else
      {
        this.newProg = form.value;

        console.log(this.selectedSession);

        for(var i = 0; i<this.selectedSession.length; i++){
          this.lstSelectedSession.push(this.selectedSession[i].id);
        }
        //check if the last item not the focus session -> add fcsession at tail
        if(this.selectedSession[this.selectedSession.length-1].focusSession != 1)
          this.lstSelectedSession.push(this.fcSession.id);

        this.newProg.numberOfSession = this.lstSelectedSession.length;

        console.log(this.lstSelectedSession);
        this.hideAdd();

        this.programService.saveProgram(this.newProg, this.lstSelectedSession, this.coachId)
          .subscribe(data => {
            console.log("result: " + data);
            if(data == 1){
              //reload program grid
              this.loadProgram();

              //this.coachId = '';

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
    this.listSessIdByProgId = [];
    this.selectedSession = [];
    this.selectedSessionRows = [];

    //get session by program id
    this.getSessionsByProgId(this.prog.id).subscribe(data => {
      this.selectedSession = data;
      this.fcSession = data[0];

      //generate index properties to prevent user remove all the list of session
      for(var i = 0; i < this.selectedSession.length; i++)
      {
        this.selectedSession[i].index = i+1;
      }

      this.selectedSessionRows = [...this.selectedSession];

      console.log(this.selectedSession);
    });
    console.log(this.listSessIdByProgId);

    //get all session
    this.getAllSessions().subscribe(data => {
      this.listAllSession = data;

      this.sessAllrows = [...this.listAllSession];
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
        else if (data == 2){
          this.alertContent = 'Error! Cannot delete. This program has already assigned to a customer.';
          this.icon = 'warning';
          this.iconText = 'Warning';
          this.viewAlert();
        }
        else{
          this.alertContent = 'System Error!';
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
  }

  applyFiltersSession = () => {
    let rows = this.listSessions;

    if (!!this.sessFnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.sessFnFilter.toLowerCase())); //startsWith
    }
    this.sessrows = rows;
  }

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
  }

  applyAllFiltersSession = () => {
    let rows = this.listAllSession;

    if (!!this.sessAllFnFilter) {
     rows = rows.filter(r => r.name.toLowerCase().startsWith(this.sessAllFnFilter.toLowerCase())); //startsWith
    }
    this.sessAllrows = rows;
  }

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

  selectSession(session){
    //console.log(session);
    this.sessIndex ++;
    let newSession = new Session();
    newSession.id = session.id;
    newSession.name = session.name;
    newSession.description = session.description;
    newSession.duration = session.duration;
    newSession.level = session.level;
    newSession.focusSession = session.focusSession;

    console.log(this.sessIndex);
    newSession.index = this.sessIndex;
    this.selectedSession.push(newSession);

    console.log(this.selectedSession);

    this.selectedSessionRows = [...this.selectedSession];
  }

  removeSession(session){
    let index = this.selectedSession.findIndex( sess => sess.index === session.index );
    console.log(index);
    if(session.index == 1){
      this.alertContent = 'Cannot remove this Focus Session!';
      this.icon = 'warning';
      this.iconText = 'Warning';
      this.viewAlert();
    }
    else{
      this.selectedSession.splice(index, 1);
      console.log(this.selectedSession);

      this.selectedSessionRows = [...this.selectedSession];
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
