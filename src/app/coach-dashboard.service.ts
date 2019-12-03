import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CoachDashboard, Ranking, BarChart, AreaChart } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class CoachDashboardService {
  apiGetCoachDashboard = '/api/coachDashboard/';
  apiGetAllRanking = '/api/coach/';
  aptGetListExerciseOfFocusSession = '/api/coachDashboard/areaChart/';
  apiGetBarChart = '/api/coachDashboard/barChart/';

  constructor(private _http: HttpClient) { }

  getAllRanking(){
    return this._http.get<Ranking[]>(this.apiGetAllRanking);
  }

  getCoachDashboard(coachId){
    return this._http.get<CoachDashboard>(this.apiGetCoachDashboard + coachId);
  }

  getListExerciseOfFocusSession(sessId){
    return this._http.get<AreaChart[]>(this.aptGetListExerciseOfFocusSession + sessId);
  }

  getBarChart(coachId){
    return this._http.get<BarChart>(this.apiGetBarChart + coachId);
  }
}
