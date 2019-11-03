import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../session.service';
import { ExerciseService } from '../../exercise.service';
import { Session, Exercise } from '../../gym.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

declare var $: any;

@Component({
  selector: 'app-coach-session',
  templateUrl: './coach-session.component.html',
  styleUrls: ['./coach-session.component.css']
})
export class CoachSessionComponent implements OnInit {
  rows: Array<Session>;
  exrows: Array<Exercise>;
  exAllrows: Array<Exercise>;

  myGroup: FormGroup;
  groupExercise: FormGroup;
  groupAllExercise: FormGroup;

  fnFilter: string;
  exFnFilter: string;
  exAllFnFilter: string;

  listSession: Session[];
  listExercise: Exercise[];
  listAllExercise: Exercise[];

  /* view session */
  sess: Session;
  /* add session */
  newSess: Session;

  //list select exercise for a session
  lstSelectedExercise: string[];
  listExIdBySessId: string[];

  alertContent: string;
  icon: string;
  iconText: string;
  sessionInfo: string;
  sessionId: string; //use for delete session
  coachId: string;
  slevel: string;

  constructor(private sessionService: SessionService,
              private fb: FormBuilder,
              private exerciseService: ExerciseService,
              private fb2: FormBuilder,
              private fb3: FormBuilder) { }

  ngOnInit() {
    this.alertContent = '';
    this.icon = '';
    this.iconText = '';
    this.lstSelectedExercise = [];
    this.sessionInfo = '';
    this.sessionId = '';
    this.coachId = '';
    this.slevel = 'Easy';
    this.listAllExercise = new Array<Exercise>();

    //load session grid
    this.loadSession();

    //filter exercise in view session
    this.exerciseFilter();

    //all exercise filter
    this.allExerciseFilter();
  }

  loadSession(){
    this.getAllSession().subscribe(data => {
      this.listSession = data;

      this.rows = [...this.listSession];
    });

    //session filter
    this.myGroup = this.fb.group({
      nameFC: ''
    });

    this.myGroup.get('nameFC').valueChanges
    .subscribe(val => {
      this.fnFilter = val;
      this.applyAllFilters();
    });
  }

  /******** SESSION *********/
  getAllSession()
  {
    return this.sessionService.getAllSession();
  }

  applyAllFilters = () => {
    let rows = this.listSession;

    if (!!this.fnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase())); //startsWith
    }
    this.rows = rows;
  }

  //view session
  view(session){
    this.sess = session;

    this.getExercisesBySessId(this.sess.id).subscribe(data => {

      this.listExercise = data;

      this.exrows = [...this.listExercise];
    });

    $("#viewModal").modal('show');
  }
  hideView() {
    document.getElementById('close-modal').click();
  }
  //end view session

  //add session
  add(){
    this.sess = new Session();
    this.newSess = new Session();
    this.sess.level = 'Easy';

    this.lstSelectedExercise = [];
    this.getAllExercise().subscribe(data => {
      this.listAllExercise = data;

      this.exAllrows = [...this.listAllExercise];

      console.log(this.exAllrows);
    });

    $("#addModal").modal('show');
  }
  onLevelChange(val){
    if(val == 2){
      this.slevel = 'Medium';
    }
    else if(val == 3){
      this.slevel = 'Difficult';
    }
    else{
      this.slevel = 'Easy';
    }
  }

  onSubmit(form){
    if(form.value.focusSession == true)
      form.value.focusSession = 1;
    else
      form.value.focusSession = 0;

    this.coachId = '1';
    this.alertContent = '';

    //alert(this.sess.id);

    if (this.sess.id != undefined){
      //update session
      //console.log('form value: ' + form.value.name + '-' + form.value.description + '-' + form.value.duration + form.value.focusSession);
      console.log(this.sess.focusSession + '-' + form.value.focusSession);

      if(form.value.name != '') /* if don't check that condition, when edit but dont change any value -> it'll be fail */
        this.sess.name = form.value.name;
      if(form.value.description != '')
        this.sess.description = form.value.description;
      if(form.value.duration != '')
        this.sess.duration = form.value.duration;
      this.sess.level = this.slevel;

      this.sess.focusSession = form.value.focusSession;
      console.log(this.sess);

      console.log(this.lstSelectedExercise);
      this.sessionService.updateSession(this.sess, this.lstSelectedExercise, this.coachId)
        .subscribe(data => {
          console.log("result: " + data);
          if(data == 1){
            this.hideAdd();
            //reload session grid
            this.loadSession();

            this.alertContent = 'Update session successful!';
            this.icon = '';
            this.iconText = 'Success';
            this.viewAlert();

            this.coachId = '';
          }
          else{
            this.alertContent = 'This session name existed!';
            this.icon = 'warning';
            this.iconText = 'Warning';
            this.viewAlert();

          }
        });
    }
    else{
      //insert new session
      if (form.value.name == null || form.value.name == ''){
          this.alertContent = 'Please input session name!';
          this.icon = 'warning';
          this.iconText = 'Warning';
          this.viewAlert();
      }
      else {
        //console.log(form.value);

        this.newSess = form.value;
        this.newSess.level = this.slevel;

        //console.log(this.newSess);
        console.log(this.lstSelectedExercise);

        this.sessionService.saveSession(this.newSess, this.lstSelectedExercise, this.coachId)
          .subscribe(data => {
            console.log("result: " + data);
            if(data == 1){
              this.hideAdd();
              //reload session grid
              this.loadSession();

              this.coachId = '';

              this.alertContent = 'Create new session successful!';
              this.icon = '';
              this.iconText = '';
              this.viewAlert();
            }
            else{
              this.alertContent = 'This session name existed!';
              this.icon = 'warning';
              this.iconText = 'Warning';
              this.viewAlert();
            }
          });
      }
    }

    this.reset(form);
  }
  hideAdd(){
    document.getElementById('close-modal-add').click();
  }

  //end add session

  reset(form){
    form.reset();
  }

  //edit session
  edit(session){
    this.sess = session;
    this.lstSelectedExercise = [];
    this.listExIdBySessId = [];

    //get exercises by session id
    this.getExercisesBySessId(this.sess.id).subscribe(data => {
      this.listExercise = data;
      //console.log(this.listExercise);
      for (var ex of this.listExercise) {
          //console.log(ex.id);
          this.listExIdBySessId.push(ex.id);
      }
    });
    console.log("list selected exs: ", this.listExIdBySessId);
    //initial assign in case user dont change anything, maybe I can remove later if it work well with grid checkbox
    this.lstSelectedExercise = this.listExIdBySessId;

    //get all exercises with check list

    this.loadCheckListExercise(this.sess.id);

    $("#addModal").modal('show');
  }

  loadCheckListExercise(sessId){
    this.getCheckListExercise(sessId).subscribe(data => {
      this.listAllExercise = data;

      this.exAllrows = [...this.listAllExercise];

      console.log(this.exAllrows);
    });
  }
  //end edit session

  //delete session
  delete(session){
    this.sessionInfo = session.id + ' - ' + session.name;
    this.sessionId = session.id;

    $("#confirmDeleteModal").modal('show');
  }

  deleteSession(){
    //process delete session
    this.hideConfirmDelete();
    //alert('start delete' + this.sessionId);
    this.sessionService.deleteSession(this.sessionId)
      .subscribe(data => {
        console.log("deleted: " + data);
        if(data == 1){
          this.alertContent = 'Delete successful!';
          this.icon = 'warning';
          this.iconText = 'Warning';
          this.viewAlert();
          this.loadSession();
        }
        else{
          this.alertContent = 'Error! Cannot delete this session!';
          this.icon = 'warning';
          this.iconText = 'Warning';
          this.viewAlert();
        }
    });
  }
  hideConfirmDelete(){
    document.getElementById('close-confirm-delete').click();
  }
  //end delete session



  /******** end - SESSION *********/


  /******** EXERCISE *********/

  //exercise filter in view session
  exerciseFilter(){
    //exercise filter
    this.groupExercise = this.fb2.group({
      exNameFC: ''
    });

    this.groupExercise.get('exNameFC').valueChanges
    .subscribe(val => {

      this.exFnFilter = val;
      this.applyFiltersExercise();
    });
  }
  applyFiltersExercise = () => {
    let rows = this.listExercise;

    if (!!this.exFnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.exFnFilter.toLowerCase())); //startsWith
    }
    this.exrows = rows;
  }

  //exercise filter in create new session
  allExerciseFilter(){
    this.groupAllExercise = this.fb3.group({
      exAllNameFC: ''
    });

    this.groupAllExercise.get('exAllNameFC').valueChanges
    .subscribe(val => {

      this.exAllFnFilter = val;
      this.applyAllFiltersExercise();
    });
  }
  applyAllFiltersExercise = () => {
    let rows = this.listAllExercise;

    if (!!this.exAllFnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.exAllFnFilter.toLowerCase())); //startsWith
    }
    this.exAllrows = rows;
  }

  getAllExercise()
  {
    return this.exerciseService.getAllExercise();
  }
  getExercisesBySessId(sessId){
    return this.exerciseService.getExercisesBySessId(sessId);
  }
  getCheckListExercise(sessId){
    return this.exerciseService.getCheckListExBySessId(sessId);
  }

  //Select exercise (checkbox event) in create new session
  onSelect(e, id){
    if(e.target.checked){
      this.lstSelectedExercise.push(id);
    }
    else{
      var index = this.lstSelectedExercise.indexOf(id);
      if (index > -1) {
        this.lstSelectedExercise.splice(index, 1);
      }
    }
  }
  /******** end - EXERCISE *********/

  /********* ALERT *********/
  viewAlert(){
    $("#alertModal").modal('show');
  }
  hideAlert(){
    document.getElementById('close-alert').click();
  }
  /********* end ALERT *********/

}


