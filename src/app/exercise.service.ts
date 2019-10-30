import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Exercise } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  apiExercises = '/api/exercises/';
  apiGetBySessId = '/api/exercisesSessions/';

  constructor(private _http: HttpClient) { }

  getAllExercise(){
    return this._http.get<Exercise[]>(this.apiExercises);
  }

  getExercisesBySessId(sessId){
    return this._http.get<Exercise[]>(this.apiGetBySessId + sessId);
  }

  getExercisesByExId(exId){
    return this._http.get<Exercise[]>(this.apiExercises + exId);
  }

  deleteExercise(exId){
      return this._http.delete<any>(this.apiExercises + exId);
    }
}
