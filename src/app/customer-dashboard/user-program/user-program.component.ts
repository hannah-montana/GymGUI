import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-user-program',
  templateUrl: './user-program.component.html',
  styleUrls: ['./user-program.component.css']
})
export class UserProgramComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showModal():void {
    $("#excerciseModal").modal('show');
  }

  sendModal(): void {
    //do something here
    this.hideModal();
  }

  hideModal():void {
    document.getElementById('close-modal').click();
  }

  /*View modal*/
  showViewModal():void {
    $("#excerciseViewModal").modal('show');
  }
  sendViewModal(): void {
   this.hideViewModal();
  }
  hideViewModal():void {
    document.getElementById('close-modalView').click();
  }
  /*end View modal*/

  /*Report modal*/
  showReportModal():void {
    $("#excerciseReportModal").modal('show');
  }
  sendReportModal(): void {
    this.hideReportModal();
  }
  hideReportModal():void {
    document.getElementById('close-modalReport').click();
  }
  /*end Report modal*/
}
