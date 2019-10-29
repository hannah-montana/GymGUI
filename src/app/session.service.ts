import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Session } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  apiGetAll = '/api/sessions';
  apiSaveSession = '/api/sessions?listEx=';

  constructor(private _http: HttpClient) { }

  getAllSession(){
    return this._http.get<Session[]>(this.apiGetAll);
  }

  saveSession(sess, listEx, coachId){
    console.log(sess);
    console.log(listEx);
    console.log(coachId);

    sess.id = 0;
    this.apiSaveSession = this.apiSaveSession + listEx + "&coachId=" + coachId;
    console.log(this.apiSaveSession);
    console.log(sess);
    return this._http.post<any>(this.apiSaveSession, sess);
  }

}
