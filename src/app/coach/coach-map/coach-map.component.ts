import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-map',
  templateUrl: './coach-map.component.html',
  styleUrls: ['./coach-map.component.css']
})
export class CoachMapComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != '1'){
      this.router.navigate(['/oops']);
    }
  }

}
