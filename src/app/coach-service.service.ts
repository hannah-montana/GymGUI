import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User, AreaChart } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class CoachServiceService {
  apiCoach = "/api/users/";
  apiUpdate = "/api/updateUsers";

  constructor(private _http: HttpClient) { }

  getCoachId(userId){
    return this._http.get<User>(this.apiCoach + userId);
  }
  updateCoach(obj){
    return this._http.put<any>(this.apiUpdate, obj);
  }
}
