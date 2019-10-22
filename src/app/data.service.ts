import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './gym.model'
import { Response } from "@angular/http";
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUser = '/api/users';
  apiCheckUser = '/api/users/checkLogin';
  body: User;

  constructor(private _http: HttpClient) { }

  registerUser(user: User) {
      this.body = new User();
      this.body.userName = user.userName;
      this.body.password = user.password;

      //alert(this.apiCheckUser);

      /*const body: User = {
        userName: user.userName,
        password: user.password //,
        //Email: user.Email,
        //firstName: '',
        //lastName: ''
      };*/
      //alert(body.userName);

      //var reqHeader = new HttpHeaders({'No-Auth':'True'});
      //return this._http.post<User>(this.apiCheckUser, body, {headers : reqHeader});
      //return this._http.post<User>(this.apiCheckUser, this.body);

      return this._http.post<User>(this.apiCheckUser, this.body);
  }

  getAllUsers()
  {
      //var data = "username=" + userName + "&password=" + password + "&grant_type=password";
      //var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
      //return this._http.post(this.rootUrl + '/token', data, { headers: reqHeader });
      return this._http.get<User[]>(this.apiUser);
  }

  test()
  {
    return 'test';
  }
}
