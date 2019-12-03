import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-sidebar',
  templateUrl: './coach-sidebar.component.html',
  styleUrls: ['./coach-sidebar.component.css']
})
export class CoachSidebarComponent implements OnInit {

  countNoti: string;

  constructor(private router: Router) { }

  ngOnInit() {
    this.countNoti = localStorage.getItem('noNotify');
    console.log(this.countNoti);
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
