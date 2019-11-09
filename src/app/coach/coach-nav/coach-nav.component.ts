import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-nav',
  templateUrl: './coach-nav.component.html',
  styleUrls: ['./coach-nav.component.css']
})
export class CoachNavComponent implements OnInit {
  firstName: string = '';

  constructor(private router: Router) { }

  ngOnInit() {
    this.firstName = localStorage.getItem('firstName');
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
