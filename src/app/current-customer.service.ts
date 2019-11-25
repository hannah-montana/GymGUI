import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CurrentCustomer, CustomerDashboard, Ranking } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentCustomerService {

  apiGetCurrentCustomer= '/api/users/currentCustomerDashboard/';
  apiGetCustomerDashboard = '/api/users/customerDashboard/';

  apiGetHealthPercent = '/api/users/healthStatus/';
  apiGetHistoryCalorie = '/api/users/historyCalorie/';
  apiGetHistoryPoint = '/api/users/historyPoint/';

  apiGetTopRanking = '/api/coach/';
  apiGetAllRanking = '/api/coach/';


  constructor(private _http: HttpClient) { }

  getCurrentCustomer(userId){
          //alert("service");
          return this._http.get<CurrentCustomer>(this.apiGetCurrentCustomer + userId);
        }
  getCustomerDashboard(userId){
          //alert("service");
          return this._http.get<CustomerDashboard>(this.apiGetCustomerDashboard + userId);
        }

  getHealthPercent(userId){
        return this._http.get<any>(this.apiGetHealthPercent + userId);
  }

  getHistoryCalorie(userId){
        return this._http.get<number[]>(this.apiGetHistoryCalorie + userId);
  }

  getHistoryPoint(userId){
          return this._http.get<number[]>(this.apiGetHistoryPoint + userId);
  }

  getTopRanking(userId){
            return this._http.get<Ranking[]>(this.apiGetTopRanking + userId);
    }
  getAllRanking(){
              return this._http.get<Ranking[]>(this.apiGetAllRanking);
      }
}
