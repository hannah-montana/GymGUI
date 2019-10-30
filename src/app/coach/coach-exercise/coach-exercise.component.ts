import { Component, OnInit } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../gym.model';
import { FormBuilder, FormGroup } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-coach-exercise',
  templateUrl: './coach-exercise.component.html',
  styleUrls: ['./coach-exercise.component.css']
})
export class CoachExerciseComponent implements OnInit {
  rows: Array<Exercise>;

  myGroup: FormGroup;

  fnFilter: string;

  listExercise: Exercise[];

  /*view exercise*/
  exe:Exercise;

  exerciseInfo: string;
  exerciseId: string;
  alertContent: string;

  icon: string;
  iconText: string;

  constructor(private exerciseService: ExerciseService, private fb: FormBuilder) { }

  ngOnInit() {
    this.exerciseInfo = '';
    this.exerciseId = '';
    this.alertContent = '';
    this.icon = '';
    this.iconText = '';

    this.loadExercises();
  }

  loadExercises(){
    this.getAllExercise().subscribe(data => {
       this.listExercise = data;

       this.rows = [...this.listExercise];
     });

     this.myGroup = this.fb.group({
       nameFC: ''
     });

     this.myGroup.get('nameFC').valueChanges
     .subscribe(val => {
       this.fnFilter = val;
       this.applyAllFilters();
     });
  }
  //filter
  applyAllFilters = () => {
    let rows = this.listExercise;

    if (!!this.fnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase())); //startsWith
    }

    this.rows = rows;
  };

  getAllExercise()
  {
    return this.exerciseService.getAllExercise();
  }

  getExercisesByExId(exId){
    return this.exerciseService.getExercisesByExId(exId);
  }


  view(exercise){
    this.exe = exercise;

    this.getExercisesByExId(this.exe.id).subscribe(data =>
    {
      this.listExercise = data;
      this.rows =[...this.listExercise];
    });
      $("#viewModal").modal('show');
    }

  hideView() {
    document.getElementById('close-modal').click();
  }

  edit(exercise){
  }

  /* Delete */
  delete(exercise){
    this.exerciseInfo = exercise.id + ' - ' + exercise.name;
    this.exerciseId = exercise.id;

    $("#confirmDeleteModal").modal('show');
  }
  hideConfirmDelete(){
    document.getElementById('close-confirm-delete').click();
  }

  deleteExercise(){
    //process delete
    this.hideConfirmDelete();

    this.exerciseService.deleteExercise(this.exerciseId)
      .subscribe(data => {
        console.log("deleted: " + data);
        if(data == 1){
          this.alertContent = 'Delete successful!';
          this.icon = 'warning';
          this.iconText = 'Warning';
          this.viewAlert();
          this.loadExercises();
        }
        else{
          this.alertContent = 'Error! Cannot delete this exercise!';
          this.icon = 'warning';
          this.iconText = 'Warning';
          this.viewAlert();
        }
    });
  }

  /********* ALERT *********/
    viewAlert(){
      $("#alertModal").modal('show');
    }
    hideAlert(){
      document.getElementById('close-alert').click();
    }
    /********* end ALERT *********/

}
