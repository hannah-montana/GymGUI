import { Component, OnInit, EventEmitter } from '@angular/core';
import { ExerciseService } from '../../exercise.service';
import { Exercise } from '../../gym.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  exe: Exercise;
  newExe: Exercise;

  exerciseInfo: string;
  exerciseId: string;
  alertContent: string;

  icon: string;
  iconText: string;

  slevel: string;
  sType: string;
  sTarget: string;

  /*File input*/
  selectedFile: File = null;
  sPhoto: string = '';
  constructor(private exerciseService: ExerciseService, private fb: FormBuilder) {
  }

  ngOnInit() {
    this.exerciseInfo = '';
    this.exerciseId = '';
    this.alertContent = '';
    this.icon = '';
    this.iconText = '';
    this.slevel = 'Easy';
    this.sType = 'Keep Fit';
    this.sTarget = 'Neck';

    this.loadExercises();
  }

  loadExercises(){
    this.listExercise = new Array<Exercise>();
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
    let rows2 = this.listExercise;

    if (!!this.fnFilter) {
      rows2 = rows2.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase())); //startsWith
    }

    this.rows = rows2;
    //console.log(this.rows);
    //console.log(this.listExercise);
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

     $("#viewModal").modal('show');
    }

  hideView() {
    document.getElementById('close-modal').click();
  }

  //add session
  add(){
    this.exe = new Exercise();
    this.exe.type = 'Keep Fit';
    this.exe.level = 'Easy';
    this.newExe = new Exercise();

    $("#addModal").modal('show');
  }

  edit(exercise){

    this.exe = exercise;
    console.log(1, exercise);
    console.log(2, this.exe);
    $("#addModal").modal('show');
  }

  onSubmit(form){
    if (this.exe.id != undefined){
      //update
      console.log(form.value);
      if(form.value.name != '')
        this.exe.name = form.value.name;
      if(form.value.description != '')
        this.exe.description = form.value.description;
      if(form.value.instruction != '')
        this.exe.instruction = form.value.instruction;
      if(form.value.duration != '')
        this.exe.duration = form.value.duration;
      if(form.value.calorie != '')
        this.exe.calorie = form.value.calorie;
      if(form.value.point != '')
        this.exe.point = form.value.point;
      if(form.value.frequency != '')
        this.exe.frequency = form.value.frequency;
      if(form.value.benefit != '')
        this.exe.benefit = form.value.benefit;

      this.exe.level = this.slevel;
      this.exe.type = this.sType;
      this.exe.target = this.sTarget;
      this.exe.photo = this.sPhoto;
      console.log(this.exe);

      //process update
      this.exerciseService.updateExercise(this.exe)
        .subscribe(data => {
        console.log("result: " + data);
          if(data == 1){
            this.loadExercises();
            this.hideAdd();

            this.alertContent = 'Updated exercise successful!';
            this.icon = '';
            this.iconText = 'Success';
            this.viewAlert();
          }
          else{
            this.alertContent = 'This exercise name existed!';
            this.icon = 'warning';
            this.iconText = 'Warning';
            this.viewAlert();
          }
      });
    }
    else{
      //add new
      if (form.value.name == null || form.value.name == ''){
          alert ("Please input exercise name!");
      }
      else{
        //console.log(form.value);
        this.newExe = form.value;
        this.newExe.level = this.slevel;
        this.newExe.type = this.sType;
        this.newExe.target = this.sTarget;
        this.newExe.photo = this.sPhoto;
        this.exe.photo = this.sPhoto; //use for view photo when changing
        this.newExe.isChecked = '';
        //console.log(this.newExe);
        this.exerciseService.saveExercise(this.newExe)
          .subscribe(data => {
          console.log("result: " + data);
            if(data == 1){
              this.loadExercises();

              this.hideAdd();

              this.alertContent = 'Create new exercise successful!';
              this.icon = '';
              this.iconText = 'Success';
              this.viewAlert();
            }
            else{
              this.alertContent = 'This exercise name existed!';
              this.icon = 'warning';
              this.iconText = 'Warning';
              this.viewAlert();
            }
        });
      }
    }

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

  hideAdd(){
    document.getElementById('close-modal-add').click();
  }

  reset(form){
    form.reset();
  }

  onTypeChange(val){
    if(val == 2){
      this.sType = 'Lose Weight';
    }
    else if(val == 3){
      this.sType = 'Increase Muscle';
    }
    else{
      this.sType = 'Keep Fit';
    }
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

  onTargetChange(newValue) {
    this.sTarget = newValue;
      //console.log(newValue);
  }
  /********* ALERT *********/
  viewAlert(){
    $("#alertModal").modal('show');
  }
  hideAlert(){
    document.getElementById('close-alert').click();
  }
  /********* end ALERT *********/

  /********* File upload *********/

  onFileSelected(event){
    this.selectedFile = event.target.files[0];
  }

  getBase64(event) {
     //this.sPhoto = '';
     let file = event.target.files[0];
     let reader = new FileReader();
     reader.readAsDataURL(file);

     /*reader.onload = function () {
       console.log(reader);
     };*/
     reader.onerror = function (error) {
       console.log('Error: ', error);
     };
     reader.onloadend = (e) => {
        //console.log(reader.result);
        this.sPhoto = reader.result.toString();
        this.exe.photo = this.sPhoto;
     };
  }

}
