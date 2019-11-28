import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './gym.model';
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
  apiUpdatePhoto = '/api/updatePhoto';
  apiCountNotify = '/api/notification/countNotifications/';

  body: User;

  constructor(private _http: HttpClient) { }

  registerUser(user: User) {
      this.body = new User();
      this.body.id = "0";
      this.body.userName = user.userName;
      this.body.password = user.password;

      return this._http.post<User>(this.apiCheckUser, this.body);
  }

  getAllUsers()
  {
      return this._http.get<User[]>(this.apiUser);
  }

  updatePhoto(user){
    return this._http.put<any>(this.apiUpdatePhoto, user);
  }

  countNotifications(userId){
    return this._http.get<any>(this.apiCountNotify + userId);
  }
}
