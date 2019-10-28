import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Session } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  apiGetAll = '/api/sessions';

  constructor(private _http: HttpClient) { }

  getAllSession(){
    return this._http.get<Session[]>(this.apiGetAll);
  }

}
