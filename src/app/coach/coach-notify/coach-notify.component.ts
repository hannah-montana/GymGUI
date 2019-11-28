import { Component, OnInit, Input } from '@angular/core';
import { CustomerNotificationService } from '../../customer-notification.service';
import { Notification} from '../../gym.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

declare var $: any;


@Component({
  selector: 'app-notify',
  templateUrl: './coach-notify.component.html',
  styleUrls: ['./coach-notify.component.css']
})
export class CoachNotifyComponent implements OnInit {

  rows: Array<Notification>;

  myGroup: FormGroup;

  userId: string;
  coachId: string;

  listNoti: Notification[];

  alertContent: string;

  icon: string
  iconText: string

  /* send new notification */
  newNoti: Notification;

  constructor(private customerNotificationService: CustomerNotificationService) { }

  ngOnInit() {
    this.icon = '';
    this.iconText = '';
    this.alertContent = '';
    this.userId = localStorage.getItem('id');
    this.coachId = localStorage.getItem('coachId');

    this.newNoti = new Notification();

    //load notifcation grid
    this.loadNotification();
  }

  loadNotification(){
    this.getAllNotifications(this.userId).subscribe(data => {
      this.listNoti = data;
      console.log(this.listNoti);

      this.rows = [...this.listNoti];
    });
  }

  getAllNotifications(userId)
  {
    return this.customerNotificationService.getAllNotifications(userId);
  }

  /*Send new notification*/
  onSubmit(form){
     if (form.value.content == null || form.value.content == ''){
       this.icon = 'warning';
       this.iconText = 'Warning';
       this.alertContent = 'Please input your message!';
       this.viewAlert();
     }
     else {
       console.log(form.value);
       this.newNoti.notifyContent = form.value.content;  //////// error
       this.newNoti.id = "0";
       this.newNoti.fromUser = this.userId;
       this.newNoti.toUser = this.coachId;
       console.log(this.newNoti);

       this.customerNotificationService.createNotification(this.newNoti)
         .subscribe(data => {
           console.log("result: " + data);
           if(data == 1){
             this.alertContent = 'Send message successfully!';
             this.icon = '';
             this.iconText = 'Success';
             this.viewAlert();
           }
         });
     }
     this.reset(form);
  }

  //updateNotification
  selectedRow(row){
    console.log(row);
    if(row.fromUser != this.userId && row.read == 0){
      this.customerNotificationService.readNotification(row)
        .subscribe(data => {
          if(data == 1){
            console.log(data);
            this.loadNotification();
          }
        });
    }
  }

  /*RESET*/
  reset(form){
    form.reset();
  }

  validate: Notification;
  validateFS(row){
    console.log(row);
    this.validate = row;
    $("#validateFocusSessionModal").modal('show');
  }

  sendValidateModal(){
    this.hideModal();

    this.customerNotificationService.updateNotification(this.validate)
      .subscribe(data => {
        if(data == 1){
          this.alertContent = 'Focus session validated!';
          this.icon = '';
          this.iconText = 'Success';
          this.viewAlert();
          this.loadNotification();
        }
        else{
          this.alertContent = 'Server Error!';
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
 hideModal(){
   document.getElementById('close-modal').click();
 }
 /********* end ALERT *********/
}

