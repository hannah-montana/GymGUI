import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Notification } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerNotificationService {

  apiGetNoti = '/api/notification/';
  apiCreateNoti = '/api/notification';
  apiReadNoti = '/api/notification';
  apiValidateNoti='/api/notification/responseValidate';

  params: string;
  read: string;
  noti: Notification;

  constructor(private _http: HttpClient) { }

  getAllNotifications(userId){
    return this._http.get<Notification[]>(this.apiGetNoti + userId);
  }

  readNotification(noti){
    return this._http.put<any>(this.apiReadNoti, noti);  // put or get ???
  }

  createNotification(noti){
    this.params = '';
    console.log(noti);
    return this._http.post<any>(this.apiCreateNoti, noti);
  }

  updateNotification(noti){
    return this._http.put<any>(this.apiValidateNoti, noti);
  }
}
