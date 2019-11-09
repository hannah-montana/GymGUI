import { Component, OnInit } from '@angular/core';
import { UserProgramService } from '../../user-program.service';
import { Session } from '../../gym.model';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';


declare var $: any;

@Component({
  selector: 'app-user-program',
  templateUrl: './user-program.component.html',
  styleUrls: ['./user-program.component.css']
})
export class UserProgramComponent implements OnInit {
  progId: String = '';

  sessRows: Session[] = null;

  constructor(private userProgramService: UserProgramService) { }

  ngOnInit() {
    //getProgramsByUserId();
    let userId = localStorage.getItem('id');
    this.getCurrentListSessionByUserId(userId);
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

  /***************************************************/

  getCurrentListSessionByUserId(userId){
    this.userProgramService.getCurrentListSessionByUserId(userId)
      .subscribe(data => {
        console.log(data);
        this.sessRows = data;
        //this.listPrograms = data;
        //this.progrows = [...this.listPrograms];

        //use for assign program list
        //this.listAllPrograms = data;
        //this.progAllrows = [...this.listAllPrograms];
       });
  }

  showDetail(row){
    console.log(row);
  }
}


