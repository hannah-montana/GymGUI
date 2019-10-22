import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../gym.model';
import { Router } from '@angular/router';

// This lets me use jquery
    declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class HomeComponent implements OnInit {

  lstUser: User[];

  constructor(private dataService: DataService,
              private router: Router) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser(){
    //console.log('123');
    //console.log(this.dataService.getAllUsers().toString());
    return this.dataService.getAllUsers().subscribe(data =>
    {
      //alert(data);
      this.lstUser = data;
    });
  }

  gotoSignUpForm(){
    this.router.navigate(['/signup']);
  }

  //dialog
  showModal():void {
    $("#myModal").modal('show');
  }
  sendModal(): void {
    //do something here
    this.hideModal();
  }
  hideModal():void {
    document.getElementById('close-modal').click();
  }

}
