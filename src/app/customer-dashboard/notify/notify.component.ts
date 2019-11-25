import { Component, OnInit, Input } from '@angular/core';
import { CustomerNotificationService } from '../../customer-notification.service';
import { Notification} from '../../gym.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';

declare var $: any;


@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

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
      this.rows = [...this.listNoti];
    });
  }

  getAllNotifications(userId){
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
       ///insert
       console.log('123');
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
            this.loadNotification();
           }
         });
       }
       this.reset(form);
  }

  /*RESET*/
  reset(form){
    form.reset();
  }

  // selected: '';

 /*change(row){
   if(this.selected === weekday) {
     this.selected = '';
   } else {
     this.selected = weekday;
   }
 }*/
 /*change(row){
  this.customerNotificationService.readNotification(row).subscribe(data => {
       this.loadNotification();
      });
 }*/

 /********* ALERT *********/
   viewAlert(){
     $("#alertModal").modal('show');
   }

   hideAlert(){
     document.getElementById('close-alert').click();
   }
   /********* end ALERT *********/
}
