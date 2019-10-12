import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FirstComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
