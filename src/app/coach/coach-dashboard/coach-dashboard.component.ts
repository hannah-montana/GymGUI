import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import { Router } from '@angular/router';
import { CoachDashboardService } from '../../coach-dashboard.service';
import { CurrentCustomerService } from '../../current-customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CoachDashboard, CurrentCustomer, Ranking, BarChart, AreaChart } from '../../gym.model';


@Component({
  selector: 'app-coach-dashboard',
  templateUrl: './coach-dashboard.component.html',
  styleUrls: ['./coach-dashboard.component.css']
})
export class CoachDashboardComponent implements OnInit {
  //used for integration
  coachId = '1';

  //use for areachart
  sessId = '1' //FocusSession
  lstAreaChart: AreaChart[];

  areaCharts: Array<AreaChart>;

  //Ranking
  lstAllRanking: Ranking[];
  ranks: Array<Ranking>;

  //Dislay Statistics
  coachDashboard : CoachDashboard;

  //Bar Chart
  barChart: BarChart;

  constructor(private router: Router,
              private coachDashboardService: CoachDashboardService,
              private currentCustomerService: CurrentCustomerService) { }

  ngOnInit() {
    this.coachDashboard = new CoachDashboard();
    this.barChart = new BarChart();

    //Display CoachDashboard Statistics
    this.loadCoachDashboard();
    this.loadAllRanking();
    this.loadListExerciseOfFocusSession();
    this.loadBarChart();

  }

  loadCoachDashboard(){
    this.getCoachDashboard(this.coachId).subscribe(data => {
      //console.log(data);
      this.coachDashboard = data;

      /* Pie chart */
      let piechart = new CanvasJS.Chart("pieChartContainer", {
        nimationEnabled: true,
        title: {
          text: "Customer Gender"
        },
        data: [{
          type: "doughnut",
          innerRadius: "40%",
          showInLegend: true,
          legendText: "{label}",
          indexLabel: "{label}: #percent%",
          dataPoints: [
            { label: "Male", y: this.coachDashboard.noMale},
            { label: "Female", y: this.coachDashboard.noFemale},
            { label: "Undefine", y: this.coachDashboard.noUndefined},
          ]
        }]
      });

      piechart.render();
    });
  }

  loadAllRanking(){
    this.getAllRanking().subscribe(data => {
      this.lstAllRanking = data;
      this.ranks = [...this.lstAllRanking];
      //alert('ranks');
    });
  }

  loadListExerciseOfFocusSession(){
    this.getListExerciseOfFocusSession().subscribe(data => {
      this.lstAreaChart = data;
      //console.log(data);
      //this.areaCharts = [...this.lstAreaChart];

      /* Area chart */
        let areachart = new CanvasJS.Chart("areaChartContainer", {
          animationEnabled: true,
            title:{
              text: "Visualization of Focus Session"
            },
            axisY :{
              valueFormatString: "",
              //prefix: "$",
              //suffix: "k",
              title: "Exercise Attributes"
            },
            toolTip: {
              shared: true
            },
            data: [{
              type: "stackedArea",
              showInLegend: true,
              name: "Point",
              //xValueFormatString: "MMM YYYY",
              //yValueFormatString: "$#,###",
              dataPoints: [
                { x: 1, y: this.lstAreaChart[0].point  },
                { x: 2, y: this.lstAreaChart[1].point  },
                { x: 3, y: this.lstAreaChart[2].point  },
                { x: 4, y: this.lstAreaChart[3].point  },
                { x: 5, y: this.lstAreaChart[4].point  }
              ]
            }, {
              type: "stackedArea",
              name: "Calorie",
              showInLegend: true,
              //xValueFormatString: "MMM YYYY",
              //yValueFormatString: "$#,###",
              dataPoints: [
                { x: 1, y: this.lstAreaChart[0].calorie  },
                { x: 2, y: this.lstAreaChart[1].calorie  },
                { x: 3, y: this.lstAreaChart[2].calorie  },
                { x: 4, y: this.lstAreaChart[3].calorie  },
                { x: 5, y: this.lstAreaChart[4].calorie  }
              ]
            }, {
              type: "stackedArea",
              name: "Duration",
              showInLegend: true,
              //yValueFormatString: "$#,###",
              dataPoints: [
                { x: 1, y: this.lstAreaChart[0].duration  },
                { x: 2, y: this.lstAreaChart[1].duration  },
                { x: 3, y: this.lstAreaChart[2].duration  },
                { x: 4, y: this.lstAreaChart[3].duration  },
                { x: 5, y: this.lstAreaChart[4].duration  }
              ]
            }]
        });

        areachart.render();
    });

  }

  loadBarChart(){
      this.getBarChart(this.coachId).subscribe(data => {
        this.barChart = data;
        console.log(this.barChart);
      });
  }


  getCoachDashboard(coachId){
      return this.coachDashboardService.getCoachDashboard(coachId);
    }
  getBarChart(coachId){
      return this.coachDashboardService.getBarChart(coachId);
    }

  getAllRanking(){
      return this.currentCustomerService.getAllRanking();
    }

  getListExerciseOfFocusSession(){
      return this.coachDashboardService.getListExerciseOfFocusSession(this.sessId);
    }

}


