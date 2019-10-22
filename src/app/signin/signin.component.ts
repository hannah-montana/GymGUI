import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service'
//import { DataService } from './../../data.service';
import { DataService } from '../data.service';
import { User } from '../gym.model'

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

  constructor(private router: Router,
              //private loginservice: AuthenticationService,
              private dataService: DataService) { }

  ngOnInit() {
  }

  checkLogin(userName, password){

    //User userbody;
    this.userBody = new User();
    this.userBody.userName = userName;
    this.userBody.password = password;
    //alert(userName);

    this.dataService.registerUser(this.userBody)
      .subscribe(
        data  => {
          console.log("POST Request is successful ", data);
          if (data.role == 1)
            this.router.navigate(['/coach', data.id]);
          else if (data.role == 2)
            this.router.navigate(['/customer']);
        },
        error  => {
          console.log("Error", error);
        }
      );
  }

  gotoGuestPage()
  {
    this.router.navigate(['/guest']);
  }

}
