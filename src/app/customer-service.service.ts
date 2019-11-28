import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './gym.model';


@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {
  apiCustomer = "/api/users/";
  apiUpdate = "/api/updateUsers";
  apiSignUp = "/api/users";
  apicheckExistingUser = "api/users/checkExistedUserName/"

  constructor(private _http: HttpClient) { }

  getCustomerId(userId){
    return this._http.get<User>(this.apiCustomer + userId);
  }

  updateCustomer(obj){
    return this._http.put<any>(this.apiUpdate, obj);
  }

  addNewUser(obj){
    return this._http.post<any>(this.apiSignUp, obj);
  }

  checkExistingUser(userName){
    return this._http.get<any>(this.apicheckExistingUser + userName);
  }
}
