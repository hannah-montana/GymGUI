import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  apiGetAll = '/api/users/getAllCustomers';
  apiSaveProgram = '/api/users?listProg=';
  apiDelete = '/api/users/';

  params: string;

  constructor(private _http: HttpClient) { }

  getAllCustomers2(){
    return this._http.get<User[]>(this.apiGetAll);
  }//ok

  deleteUser(userId){
    //alert(sessId);
    return this._http.delete<any>(this.apiDelete + userId);
  }

  saveUser(user, listProg, coachId){
    this.params = '';

    console.log(listProg);
    console.log(coachId);

    user.id = 0;
    this.params = listProg + "&coachId=" + coachId;

    console.log(this.apiSaveProgram + this.params);
    console.log(user);
    return this._http.post<any>(this.apiSaveProgram + this.params, user);
  }
}
