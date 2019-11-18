import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../gym.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach',
  templateUrl: './coach.component.html',
  styleUrls: ['./coach.component.css']
})
export class CoachComponent implements OnInit {
  myParam: User;
  userId: string;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != '1'){
      this.router.navigate(['/oops']);
    }
  }

  getUserById(id){
  }

}
