import { Component, OnInit } from '@angular/core';
import { UserProgramService } from '../../user-program.service';
import { Session, Exercise, Notification, History } from '../../gym.model';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { ExerciseService } from '../../exercise.service';
import { FormsModule } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-user-program',
  templateUrl: './user-program.component.html',
  styleUrls: ['./user-program.component.css']
})
export class UserProgramComponent implements OnInit {
  progId: String = '';

  sessRows: Session[] = null;
  furtherSess: Session[] = null;
  session: Session;
  notification: Notification;

  exrows: Array<Exercise>;
  hisRows: Array<History>;
  furtherExercise: Exercise[];
  userId: String;
  sessionId: String;
  lbl_notification: String;

  hisPractical: History[] = null;
  history: History;

  icon: string;
  iconText: string;
  alertContent: string;

  constructor(private userProgramService: UserProgramService,
              private exerciseService: ExerciseService) { }

  ngOnInit() {
    this.userId = localStorage.getItem('id');
    this.session = new Session();
    this.history = new History();
    this.hisPractical = new Array<History>();

    let userId = localStorage.getItem('id');
    this.getCurrentListSessionByUserId(this.userId);
  }

  /* Validate focus session */
  showValidateModal(session){
    this.lbl_notification = '';
    this.session = session;
    /*
    1. Check this focus session is validated or not
    2. If yes -> raise message
    3. Else -> send to coach
    */
    this.userProgramService.checkSendValidateFS(session.id, localStorage.getItem('id')).subscribe(data =>{
      console.log(data);
      if(data == 4)
        this.lbl_notification = 'Your request sent to coach! Please wait...';
      else if(data == 2 || data == 0)
        this.lbl_notification = 'The coach has already validated your request!';
      else if(data == 3)
        this.lbl_notification = "Warning! You haven't finish this session!";
      else
        $("#validateFocusSessionModal").modal('show');
    });
  }

  sendValidateModal(): void {
    console.log(this.session);
    this.notification = new Notification();
    this.notification.id = '0';
    this.notification.notifyContent = "Warning! Validate FOCUS SESSION: " + this.session.id;
    this.notification.fromUser = localStorage.getItem('id');
    this.notification.toUser = localStorage.getItem('coachId');
    this.notification.focusSessionId = this.session.id;
    this.notification.validatedFromCustomer = '1';
    this.notification.validatedFromCoach = '0';

    this.userProgramService.validateFocusSession(this.notification).subscribe(data => {
      if(data == 1){
        this.lbl_notification = 'Your request sent to coach! Please wait...';
        this.getCurrentListSessionByUserId(this.userId);
      }
      else{
        this.lbl_notification = 'System Error!';
      }
    });
    this.hideModal();
  }

  hideModal():void {
    document.getElementById('close-modal').click();
  }
  /* end Validate focus session */

  /*View list exercise by session */
  //get list exercise for further session
  loadListExerciseBySessionId(sessionId){
    this.getExercisesBySessId(sessionId).subscribe(data => {
      this.furtherExercise = data;
      console.log(this.furtherExercise);
    });
  }

  viewPractiseExcercise(session){
    this.session = session;

    this.getExerciseFromHistory(this.session.id).subscribe(data => {
      //this.exrows = data;
      console.log(data);
      this.hisRows = data;
    });
  }

  hideView(){
    document.getElementById('close-modal-view').click();
  }

  getExercisesBySessId(sessId){
    return this.exerciseService.getExercisesBySessId(sessId);
  }

  getExerciseFromHistory(sessId){
    return this.exerciseService.getExerciseFromHistory(this.userId, sessId);
  }

  showDetail(row){
    this.hisPractical = new Array<History>();
    console.log(row);
    //get list exercise by sessionid from history
    this.viewPractiseExcercise(row);
    $("#viewModal").modal('show');
  }

  onSubmit(form){
    console.log(form.value);
    var objects = form.value;

    //get practical value
    this.hisPractical = new Array<History>();
    for(var key in objects){
      //console.log(key, objects[key]);
      this.history = new History();
      this.history.id = key;
      this.history.praticalDuration = objects[key];
      this.hisPractical.push(this.history);
    }
    //console.log(this.hisPractical);
    //bug here

    //save
    this.userProgramService.updatePractical(this.hisPractical)
      .subscribe(data => {
        if(data == 1){
          this.hideView();
          this.getCurrentListSessionByUserId(this.userId);

          this.alertContent = 'Updated practical successful!';
          this.icon = '';
          this.iconText = 'Success';
          this.viewAlert();
        }
        else{
          this.hideView();

          this.alertContent = 'Server Error!';
          this.icon = 'warning';
          this.iconText = 'Warning';
          this.viewAlert();
        }
      });
  }
  /*end View list exercise by session */

  /*View Further session*/
  showFurtherSession() {
    this.getFurtherSessionByUserId(this.userId);
    $("#excerciseViewModal").modal('show');
  }

  hideFurtherSession():void {
    document.getElementById('close-modalView').click();
  }
  /*end View Further session*/

  /*Report modal*/
  lastSession: Session;
  showReportModal() {
    /*
    Current session must be complete
    Check next session is focus session or not
    If yes -> send Report
    Else -> raise warning
    */
    console.log(this.sessRows.length);
    this.lastSession = this.sessRows[this.sessRows.length - 1];
    console.log(this.lastSession);

    this.userProgramService.checkFinishedSession(localStorage.getItem('id'), this.lastSession.id).subscribe(data =>{
      if(data == 1)
        this.lbl_notification = "Warning! You haven't finish this session!";
      else if(data == 2){
        //send report
        $("#excerciseReportModal").modal('show');
      }
      else if(data == 3)
        this.lbl_notification = "Warning! You have to finish all normal session before send report.";
      else
        this.lbl_notification = "Server Error!";
    });
  }

  sendReportModal(): void {
    this.hideReportModal();
  }
  hideReportModal():void {
    document.getElementById('close-modalReport').click();
  }
  /*end Report modal*/

  /***************************************************/

  getCurrentListSessionByUserId(userId){
    this.userProgramService.getCurrentListSessionByUserId(userId)
      .subscribe(data => {
        console.log(data);
        this.sessRows = data;
       });
  }

  getFurtherSessionByUserId(userId){
    this.userProgramService.getFurtherSessionByUserId(userId)
      .subscribe(data => {
        console.log(data);
        this.furtherSess = data;
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




