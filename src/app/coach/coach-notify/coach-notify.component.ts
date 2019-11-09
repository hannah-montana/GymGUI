import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-coach-notify',
  templateUrl: './coach-notify.component.html',
  styleUrls: ['./coach-notify.component.css']
})
export class CoachNotifyComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem('role') != '1'){
      this.router.navigate(['/oops']);
    }
    else{
    }
  }

}
