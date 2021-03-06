import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Session, Report, Evoluation, DataPoint } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class UserProgramService {
  apiGetCurrentListSessionByUserId = '/api/sessions/getCurrentSessionByUserId/';
  apiGetFurtherSessionByUserId = '/api/sessions/getFurtherSessionByUserId/';
  apiValidateNotification = '/api/notification/validate';
  apiCheckSendValidateFS = '/api/notification/checkValidated/';
  apiUpdatePractical = '/api/history/updatePractical';
  apiCheckFinishedSession = '/api/sessions/checkFinish/';
  apiCustomerSendReport = '/api/notification/customerSendReport';
  apiEvoluation = '/api/getEvoluation/';

  constructor(private _http: HttpClient) { }

  getCurrentListSessionByUserId(userId){
    return this._http.get<Session[]>(this.apiGetCurrentListSessionByUserId + userId);
  }

  getFurtherSessionByUserId(userId){
    return this._http.get<Session[]>(this.apiGetFurtherSessionByUserId + userId);
  }

  validateFocusSession(notification){
    return this._http.post<any>(this.apiValidateNotification, notification);
  }

  checkSendValidateFS(focusSessionId, fromUser){
    return this._http.get<any>(this.apiCheckSendValidateFS + focusSessionId + '/' + fromUser);
  }

  updatePractical(lstHistory){
    return this._http.post<any>(this.apiUpdatePractical, lstHistory);
  }

  checkFinishedSession(userId, sessId){
    return this._http.get<any>(this.apiCheckFinishedSession + userId + '/' + sessId);
  }

  customerSendReport(report){
    return this._http.post<any>(this.apiCustomerSendReport, report);
  }

  getEvoluation(userId){
    return this._http.get<Evoluation[]>(this.apiEvoluation + userId);
  }
}
