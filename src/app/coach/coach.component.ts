import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../gym.model';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {
  myParam: User;
  userId: string;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    //this.myParam = this.route.params.subscribe(params => {
    //       this.data = +params['data'];
    //this.myParam = new User();

    this.activeRoute.params.subscribe((params) => this.userId = params['id']);

    console.log(this.userId);
  }

  getUserById(id){

  }

}
