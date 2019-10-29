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

  //list select exercise for a session
  lstSelectedExercise: string[];

  alertContent: string;

  constructor(private sessionService: SessionService,
              private fb: FormBuilder,
              private exerciseService: ExerciseService,
              private fb2: FormBuilder,
              private fb3: FormBuilder) { }

  ngOnInit() {
    this.alertContent = '';
    this.lstSelectedExercise = [];

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
    return this.sessionService.getAllSession(); //.subscribe(data =>
    //{
    //  this.listSession = data;
      //console.log(data);
    //});
  }

  applyAllFilters = () => {
    let rows = this.listSession;

    if (!!this.fnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase())); //startsWith
    }
    this.rows = rows;
  }

  view(session){
    this.sess = session;

    this.getExercisesBySessId(this.sess.id).subscribe(data => {
      //this.listExercise = [...data];

      this.listExercise = data;

      this.exrows = [...this.listExercise];
    });


    $("#viewModal").modal('show');

  }

  hideView() {
    document.getElementById('close-modal').click();
  }

  edit(session){
  }

  delete(session){
  }

  add(){
    this.getAllExercise().subscribe(data => {
      this.listAllExercise = data;

      this.exAllrows = [...this.listAllExercise];
    });

    $("#addModal").modal('show');
  }

  hideAdd(){
    document.getElementById('close-modal-add').click();
  }

  onSubmit(data){
    if (data.name == null || data.name == ''){
      alert ("Please input session name!");
    }
    else {
      this.sessionService.saveSession(data, this.lstSelectedExercise, 1)
        .subscribe(data => {
          console.log("result: " + data);
          if(data == 1){
            this.hideAdd();
            //reload session grid
            this.loadSession();
            //rows = rows.push(data);
            //alert("Save successful!");
          }
          else{
            this.alertContent = 'This session name existed!';
            this.viewAlert();
          }
        });
    }
  }

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


