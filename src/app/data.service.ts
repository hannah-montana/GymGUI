import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { User } from './gym.model'
@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUser = '/api/users';

  constructor(private _http: HttpClient) { }

  getAllUsers()
  {
      return this._http.get<User[]>(this.apiUser);
  }
}
