import { Component, OnInit } from '@angular/core';
import { CoachServiceService } from '../../coach-service.service';
import { DataService } from '../../data.service';
import { User } from '../../gym.model';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.css']
})
export class CoachProfileComponent implements OnInit {
  profile: User;
  user_id: string;
  userName: string;
  icon: string = '';
  iconText: string = '';
  alertContent: string = '';


  constructor(private coachService: CoachServiceService,
              private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != '1'){
      this.router.navigate(['/oops']);
    }
    else{
      this.user_id = localStorage.getItem('id');
      this.loadProfile();
    }
  }

  loadProfile(){
    this.coachService.getCoachId(this.user_id).subscribe(data=> {
      this.profile = data;
    });
  }
  onSubmit(form){
    console.log(form.value);
    if (form.value.newpass != form.value.repeatnewpass)
    {
      this.alertContent = "Password doesn't match!";
      this.icon = 'warning';
      this.iconText = 'Warning';
      this.viewAlert();
    }
    else {
      this.profile.id = this.user_id;
      if(form.value.firstName != '')
         this.profile.firstName = form.value.firstName;
      if(form.value.lastName != '')
         this.profile.lastName = form.value.lastName;
      if(form.value.email != '')
         this.profile.email = form.value.email;
      if(form.value.userName != '')
         this.profile.userName = form.value.userName;
      if(form.value.note != '')
         this.profile.note = form.value.note;
      if(form.value.birthDate != '')
         this.profile.birthDate = form.value.birthDate;
      if(form.value.newpass != '')
         this.profile.password = form.value.newpass;
      console.log(this.profile);
      this.coachService.updateCoach(this.profile).subscribe(data =>{
        if (data == 1){
          this.alertContent = 'Update Successful';
          this.icon = '';
          this.iconText = '';
          this.viewAlert();
        }
        else{
          this.alertContent = 'Update failure';
          this.icon = 'warning';
          this.iconText = 'Warning';
          this.viewAlert();
        }
      });
    }
  }
  changePhoto(){
    document.getElementById('change-photo').click();
  }
  sPhoto: string = '';

  getBase64(event){
    //alert('change photo');
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onerror = function (error) {
     console.log('Error: ', error);
    };
    reader.onloadend = (e) => {
      this.sPhoto = reader.result.toString();
      //process change photo here
      this.profile.photo = this.sPhoto;
      this.dataService.updatePhoto(this.profile).subscribe(data =>{
        if(data == 0)
          alert('Error');
      });

    };
  }

  hideAlert(){
    document.getElementById('close-alert').click();
  }
  viewAlert(){
    $("#alertModal").modal('show');
  }
}
