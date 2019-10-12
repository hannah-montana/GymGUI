import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../data.service';
import { User } from '../gym.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  lstUser: User[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser(){
    //console.log('123');
    //console.log(this.dataService.getAllUsers().toString());
    return this.dataService.getAllUsers().subscribe(data =>
    {
        this.lstUser = data;
    });
  }
}
