import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service'
//import { DataService } from './../../data.service';
import { DataService } from '../data.service';
import { User } from '../gym.model';



@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SignInComponent implements OnInit {

  //userName = '';
  //password = '';
  invalidLogin = false;
  user: User;
  userBody: User;
  errorMess: string = '';

  constructor(private router: Router,
    //private loginservice: AuthenticationService,
    private dataService: DataService) { }

  ngOnInit() {
  }

  checkLogin(userName, password){
    this.errorMess = '';

    if(userName == '')
      this.errorMess = 'Please input username';
    else if(password == '')
      this.errorMess = 'Please input password';
    else{
      this.userBody = new User();
      this.userBody.userName = userName;
      this.userBody.password = password;

      this.dataService.registerUser(this.userBody)
        .subscribe(
          data  => {
            console.log("POST Request is successful ", data);
            this.setLocalStorage(data);

            if (data.role == 1)
              this.router.navigate(['/coach']);
            else if (data.role == 2)
              this.router.navigate(['/profile']);
          },
          error  => {
            console.log("Error", error);
            this.errorMess = "Username or Password does not correct!";
          }
        );
    }
  }

  setLocalStorage(data){
    localStorage.setItem('id', data.id);
    localStorage.setItem('firstName', data.firstName);
    localStorage.setItem('lastName', data.lastName);
    localStorage.setItem('role', data.role.toString());
    localStorage.setItem('coachId', data.coachId);

    this.dataService.countNotifications(data.id)
      .subscribe(data => {
        localStorage.setItem('noNotify', data);
    });
  }

  gotoGuestPage()
  {
    this.router.navigate(['/guest']);
  }
}
