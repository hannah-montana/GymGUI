import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Program, ProgramUser } from './gym.model';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  apiGetAll = '/api/programs';
  apiSaveProgram = '/api/programs?listSes=';
  apiDelete = '/api/programs/';
  apiGetProgramsByUserId = '/api/programsUsers/';
  apiAssign = '/api/programsUsers';
  apiCheckAssigned = '/api/checkAssign/';

  params: string;

  constructor(private _http: HttpClient) { }

  getAllPrograms(){
    return this._http.get<Program[]>(this.apiGetAll);
  }

  saveProgram(prog, listSess, coachId){
    this.params = '';

    console.log(listSess);
    console.log(coachId);

    prog.id = 0;
    this.params = listSess + "&coachId=" + coachId;

    console.log(this.apiSaveProgram + this.params);
    console.log(prog);
    return this._http.post<any>(this.apiSaveProgram + this.params, prog);
  }

  deleteProgram(progId){
    //alert(sessId);
    return this._http.delete<any>(this.apiDelete + progId);
  }

  getProgramsByUserId(userId){
    return this._http.get<Program[]>(this.apiGetProgramsByUserId + userId);
  }

  assignProgramToCustomer(proUser){
    return this._http.post<any>(this.apiAssign, proUser);
  }

  checkAssign(userId){
    return this._http.get<any>(this.apiCheckAssigned + userId);
  }
}
