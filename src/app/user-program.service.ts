import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Session } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class UserProgramService {
  apiGetCurrentListSessionByUserId = '/api/sessions/getCurrentSessionByUserId/';

  constructor(private _http: HttpClient) { }

  getCurrentListSessionByUserId(userId){
    return this._http.get<Session[]>(this.apiGetCurrentListSessionByUserId + userId);
  }
}
