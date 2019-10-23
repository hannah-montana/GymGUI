import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.css']
})
export class UserSidebarComponent implements OnInit {

  list:any;
  selected :any;

  constructor() {
    this.list = [
               'Read about Angular',
               'Read about knockout',
               'Read about backbone',
               'Read about jquery',
               'Read about javascript'
            ];
  }

  ngOnInit() {
  }

  select(item) {
    //console.log(item);
    this.selected = item;
  };
  isActive(item) {
      //console.log(this.cusProfile);
      //deActive("Profile");
      return this.selected === item;
  };
}
