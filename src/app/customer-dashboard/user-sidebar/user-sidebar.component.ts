import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  list:any;
  selected :any;
  countNoti: string;

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.countNoti = localStorage.getItem('noNotify');
    console.log(this.countNoti);
  }

  select(item) {
    this.selected = item;
  };
  isActive(item) {
    return this.selected === item;
  };

  logOut(){
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
