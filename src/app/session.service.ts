import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Session } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  apiGetAll = '/api/sessions';
  apiSaveSession = '/api/sessions?listEx=';
  apiDelete = '/api/sessions/';
  apiUpdate = '/api/sessions/exercises?listEx=';
  getSessionsByProgId = '/api/sessionsPrograms/';

  constructor(private _http: HttpClient) { }

  params: string;

  getAllSession(){
    return this._http.get<Session[]>(this.apiGetAll);
  }

  saveSession(sess, listEx, coachId){
    this.params = '';

    console.log("obj: " + sess);
    console.log("list ex: " + listEx);
    console.log("coach: " + coachId);

    sess.id = 0;
    this.params = listEx + "&coachId=" + coachId;

    console.log(this.apiSaveSession + this.params);
    console.log(sess);
    return this._http.post<any>(this.apiSaveSession + this.params, sess);
  }

  updateSession(sess, listEx, coachId){
    this.params = '';
    this.params = listEx + "&coachId=" + coachId;
    return this._http.put<any>(this.apiUpdate + this.params, sess);
  }

  deleteSession(sessId){
    //alert(sessId);
    return this._http.delete<any>(this.apiDelete + sessId);
  }

  getSessionsByProgId2(progId){
    return this._http.get<Session[]>(this.getSessionsByProgId + progId);
  }

}
