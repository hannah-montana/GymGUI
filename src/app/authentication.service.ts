import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

export class User{
  constructor(public status:string,) {}
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUser = '/api/users';

  constructor(private httpClient:HttpClient) { }

  authenticate(userName, password) {
  const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(userName + ':' + password) });
    return this.httpClient.get<User>(this.apiUser + '/validateLogin',{headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('userName',userName);
        return userData;
       }
     )
  );
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('userName')
    console.log(!(user === null))
    return !(user === null)
  }

  logOut() {
    sessionStorage.removeItem('userName')
  }

}
