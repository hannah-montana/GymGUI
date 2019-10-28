import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../../session.service';
import { Session } from '../../gym.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Person } from '../../gym.model';

@Component({
  selector: 'app-coach-session',
  templateUrl: './coach-session.component.html',
  styleUrls: ['./coach-session.component.css']
})
export class CoachSessionComponent implements OnInit {
  rows: Array<Session>;

  myGroup: FormGroup;

  fnFilter: string;

  sorts: any;

  listSession: Session[];
  constructor(private sessionService: SessionService, private fb: FormBuilder ) { }

  ngOnInit() {
    this.getAllSession().subscribe(data => {
      this.listSession = data;

      this.rows = [...this.listSession];
    });

    this.myGroup = this.fb.group({
      nameFC: ''
    });

    this.myGroup.get('nameFC').valueChanges
    .subscribe(val => {
      this.fnFilter = val;
      this.applyAllFilters();
    });

    //this.sorts = [{ prop: 'id', dir: 'asc' }];
  }

  getAllSession()
  {
    return this.sessionService.getAllSession(); //.subscribe(data =>
    //{
    //  this.listSession = data;
      //console.log(data);
    //});
  }

  applyAllFilters = () => {
    let rows = this.listSession;

    if (!!this.fnFilter) {
      rows = rows.filter(r => r.name.toLowerCase().startsWith(this.fnFilter.toLowerCase())); //startsWith
    }

    this.rows = rows;
  };

}
