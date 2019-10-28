import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Exercise } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  apiGetAll = '/api/excercises/';
  apiGetBySessId = '/api/exercisesSessions/';

  constructor(private _http: HttpClient) { }

  getAllExercise(){
    return this._http.get<Exercise[]>(this.apiGetAll);
  }

  getExercisesBySessId(sessId){
    return this._http.get<Exercise[]>(this.apiGetBySessId + sessId);
  }
}
