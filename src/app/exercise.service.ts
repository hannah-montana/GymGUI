import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Exercise } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {
  apiExercises = '/api/exercises/';
  apiGetBySessId = '/api/exercisesSessions/';
  apiSaveExercise = '/api/exercises';
  uploadTarget = 'http://localhost:4200'; //assets/images/exercises
  //uploadTarget = 'D:/1_MIAGE/Semester_3_2019_2020/Innovation_Software_Method/Project/Startup/Source code/Client/GymGUI/src/assets/images/exercises';
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

  saveExercise(exe){
    exe.id = '0';
    return this._http.post<any>(this.apiSaveExercise, exe);
  }

  updateExercise(exe){
    return this._http.put<any>(this.apiSaveExercise, exe);
  }

}
