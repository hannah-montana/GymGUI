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
  exrows: Array<Exercise>

  myGroup: FormGroup;
  groupExercise: FormGroup;

  fnFilter: string;
  exFnFilter: string;

  listSession: Session[];
  listExercise: Exercise[];

  /* view session */
  sess: Session;

  constructor(private sessionService: SessionService,
              private fb: FormBuilder,
              private exerciseService: ExerciseService,
              private fb2: FormBuilder) { }

  ngOnInit() {
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

    //exercise filter
    this.groupExercise = this.fb2.group({
      exNameFC: ''
    });

    this.groupExercise.get('exNameFC').valueChanges
    .subscribe(val => {

      this.exFnFilter = val;
      this.applyAllFiltersExercise();
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
  /******** end - SESSION *********/


  /******** EXERCISE *********/
  getAllExercise()
  {
    return this.exerciseService.getAllExercise();
  }
  getExercisesBySessId(sessId){
    return this.exerciseService.getExercisesBySessId(sessId);
  }
  applyAllFiltersExercise = () => {
    let rows = this.listExercise;

    if (!!this.exFnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.exFnFilter.toLowerCase())); //startsWith
    }
    this.exrows = rows;
  }
  /******** end - EXERCISE *********/
}
