import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-oops',
  templateUrl: './oops.component.html',
  styleUrls: ['./oops.component.css']
})
export class OopsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goBack(){
    if(localStorage.getItem('role') == '1'){
      this.router.navigate(['/coach']);
    }
    else if(localStorage.getItem('role') == '2'){
      this.router.navigate(['/customer']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
}
