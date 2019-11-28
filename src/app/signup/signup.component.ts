import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerServiceService } from '../customer-service.service';
import { User } from '../gym.model';

declare var $: any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  profile: User;
  icon: string = '';
  iconText: string = '';
  alertContent: string = '';
  lblNotify: string = '';
  purpose: number;

  constructor(private router: Router,
              private customerService: CustomerServiceService) { }

  ngOnInit() {
    this.lblNotify = '';
    this.purpose = 2;
  }

  onSubmit(form){
    this.lblNotify = '';
    console.log(form.value);

    if(form.value.firstName == undefined || form.value.firstName == ''){
      this.lblNotify = 'Please fill all fields!';
      return;
    }
    else if(form.value.lastName == undefined || form.value.lastName == ''){
      this.lblNotify = 'Please fill all fields!';
      return;
    }
    else if(form.value.userName == undefined || form.value.userName == ''){
      this.lblNotify = 'Please fill all fields!';
      return;
    }
    else if(form.value.password == undefined || form.value.password == ''){
      this.lblNotify = 'Please fill all fields!';
      return;
    }
    else if(form.value.repeatPassword == undefined || form.value.repeatPassword == ''){
      this.lblNotify = 'Please fill all fields!';
      return;
    }
    else if(form.value.password != form.value.repeatPassword){
      this.lblNotify = "Your password don't match!";
      return;
    }
    else{
      this.profile = form.value;
      this.profile.id = '0';
      if(form.value.purpose == 1)
        this.profile.purpose = 'Loose Weight';
      else if(form.value.purpose == 2)
        this.profile.purpose = 'Increase Muscle';
      else
        this.profile.purpose = 'Keep Fit';

      this.customerService.checkExistingUser(this.profile.userName)
        .subscribe(data => {
          console.log(data);
          if(data == 1){
              this.alertContent = 'Username has already existed!';
              this.icon = 'warning';
              this.iconText = 'Warning';
              this.viewAlert();
            }
            else{
              //create new user
              this.createNewAccount();
            }
      });
    }
  }

  createNewAccount(){
    this.customerService.addNewUser(this.profile).subscribe(data =>{
      if (data == 1){
        this.viewSignUpSuccessful();
      }else{
        this.alertContent = 'Server Error!';
        this.icon = 'warning';
        this.iconText = 'Error';
        this.viewAlert();
      }
    });
  }

  viewAlert(){
    $("#alertModal").modal('show');
  }

  hideAlert(){
    document.getElementById('close-alert').click();
  }

  signUp(){
    this.router.navigate(['/customer']);
  }

  viewSignUpSuccessful(){
    $("#signUpModal").modal('show');
  }

  hideSignUp(){
    document.getElementById('close-signup').click();
  }

  goToSignIn(){
    this.router.navigate(['/login']);
  }

}

