import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import { CurrentCustomerService } from '../../current-customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CustomerDashboard, CurrentCustomer, Ranking, DataPoint } from '../../gym.model';
import { UserProgramService} from '../../user-program.service';

declare var $: any;

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  percentHealth: number;

  totalCalories: number;
  totalDuration: number;
  totalExercises: number;

  //Pie Chart
  numExEasy: number;
  numExMedium: number;
  numExDifficult: number;

  //Charts
  lstCalorie: number[];
  lstPoint: number[];

  //Ranking
  lstTopRanking: Ranking[];
  ranks: Array<Ranking>;

  //Health Status
  currentPoint: number;
  totalPoints: number;

  //used for integration
  userId: string;

  customerDashboard: CustomerDashboard;
  currentCustomer: CurrentCustomer;

  constructor(private router: Router,
              private currentCustomerService: CurrentCustomerService,
              private userService: UserProgramService) { }

  ngOnInit() {
    if(localStorage.getItem('role') != '2'){
      this.router.navigate(['/oops']);
    }
    else{
      this.userId = localStorage.getItem('id');
      this.customerDashboard = new CustomerDashboard();
      this.currentCustomer = new CurrentCustomer();
      this.percentHealth = 0;
      this.totalPoints = 0;
      this.totalCalories = 0;
      this.totalDuration = 0;
      this.totalExercises = 0;
      this.currentPoint = 0;
      this.numExEasy = 0;
      this.numExMedium = 0;
      this.numExDifficult = 0;

      this.lstTopRanking = [];

      //Display Statistics
      this.loadCurrentCustomer();

      //Display bar chart
      //evoluation
      this.getEvoluation();

      //Display line chart
      this.loadHistoryCalorie();

      //Display Gamification
      this.loadHealthPercent();

      //Display Ranking
      this.loadTopRanking();
    }
  }

  fillHealthStatus(percent){
    if (percent == 0){}
    else if (percent > 0 && percent <= 35){
      (document.querySelector('.legs') as HTMLElement).style.fill = '#ff4000';
      (document.querySelector('.hands') as HTMLElement).style.fill = '#ff4000';
    }
    else if (percent > 35 && percent <= 65){
      (document.querySelector('.legs') as HTMLElement).style.fill = '#f9f906';
      (document.querySelector('.hands') as HTMLElement).style.fill = '#f9f906';
      (document.querySelector('.arm') as HTMLElement).style.fill = '#f9f906';
      (document.querySelector('.stomach') as HTMLElement).style.fill = '#f9f906';
    }
    else if (percent > 65 && percent <= 75){
      (document.querySelector('.legs') as HTMLElement).style.fill = '#f9f906';
      (document.querySelector('.hands') as HTMLElement).style.fill = '#f9f906';
      (document.querySelector('.arm') as HTMLElement).style.fill = '#f9f906';
      (document.querySelector('.cheast') as HTMLElement).style.fill = '#f9f906';
      (document.querySelector('.stomach') as HTMLElement).style.fill = '#f9f906';
    }
    else if (percent > 75 && percent <= 90){
      (document.querySelector('.legs') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.hands') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.arm') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.cheast') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.stomach') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.shoulder') as HTMLElement).style.fill = '#33cc33';
    }
    else{
      (document.querySelector('.legs') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.hands') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.arm') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.cheast') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.stomach') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.shoulder') as HTMLElement).style.fill = '#33cc33';
      (document.querySelector('.head') as HTMLElement).style.fill = '#33cc33';
    }
  }

  gotoUserProfile(){
    this.router.navigate(['/user-profile']);
  }

  /*Load Dashboard*/
  loadCurrentCustomer(){
    this.getCurrentCustomer(this.userId).subscribe(data => {
      //console.log(data);
      this.currentCustomer = data;
      this.numExEasy = this.currentCustomer.numExEasy;
      this.numExMedium = this.currentCustomer.numExMedium;
      this.numExDifficult = this.currentCustomer.numExDifficult;

      /* Pie chart */
      let piechart = new CanvasJS.Chart("pieChartContainer", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title:{
          text: "History Exercises"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: [
            { y: this.numExEasy, name: "Easy" },
            { y: this.numExMedium, name: "Medium" },
            { y: this.numExDifficult, name: "Difficult" }
          ]
        }]
      });
      piechart.render();
    });
   }


  loadHealthPercent(){
    this.getHealthPercent(this.userId).subscribe(data => {
      //console.log('health: ',data);
      this.percentHealth = data;
      this.fillHealthStatus(this.percentHealth);
    });
  }

  loadHistoryPoint(){
    this.currentCustomerService.getHistoryPoint(this.userId).subscribe(data => {
      //console.log(data);

      /* Bar chart */
      let chart = new CanvasJS.Chart("barChartContainer", {
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "History Points"
        },
        data: [{
          type: "column",
          dataPoints: data
        }]
      });
      chart.render();
    });
  }

  loadHistoryCalorie(){
    this.currentCustomerService.getHistoryCalorie(this.userId).subscribe(data => {
      //console.log("1: calorie");
      //console.log(data);

      /* Line chart */
      let dataPoints = [];

      let y = 0;
      let linechart = new CanvasJS.Chart("lineChartContainer", {
        zoomEnabled: true,
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "History Calories"
        },
        subtitles:[{
          text: ""
        }],
        data: [
        {
          type: "line",
          dataPoints: data
        }]
      });

      linechart.render();
    });
  }

  loadTopRanking(){
    this.getTopRanking(this.userId).subscribe(data => {
      //console.log('ranking');
      //console.log(data);
      this.lstTopRanking = data;
      this.ranks = [...this.lstTopRanking];
    });
  }
  //Prepare current training result of customer
  getCurrentCustomer(userId){
    return this.currentCustomerService.getCurrentCustomer(userId);
  }

  //Prepare total training result of customer assigned by Coach
  getCustomerDashboard(userId){
    return this.currentCustomerService.getCustomerDashboard(userId);
  }

  //Prepare Helth Status
  getHealthPercent(userId){
    return this.currentCustomerService.getHealthPercent(userId);
  }

  //Prepare Calorie Chart
  getHistoryCalorie(userId){
    return this.currentCustomerService.getHistoryCalorie(userId);
  }

  //Prepare Point Chart
  getHistoryPoint(userId){
    return this.currentCustomerService.getHistoryPoint(userId);
  }

  getTopRanking(userId){
    return this.currentCustomerService.getTopRanking(userId);
  }

  chart;
  getEvoluation(){
    //get evoluation
    this.userService.getEvoluation(this.userId).subscribe(data =>{
      console.log("2: evolution");
      console.log(data);
      let dataPoints = [];
      dataPoints = [{
                  type: "column",
                  name: "FS1",
                  showInLegend: true,
                  dataPoints:[
                    {label: "Barbell deadlifts", y: 15},
                     {label: "Push-ups (or dips)", y: 11},
                     {label: "Pull-ups (or Inverted Rows)", y: 15},
                     {label: "Incline dumbbell press", y: 12},
                     {label: "Running", y: 10},
                     {label: "Sit-Ups", y: 9},
                     {label: "Burpees", y: 10}
                  ]
                },
                {
                  type: "column",
                  name: "FS2",
                  showInLegend: true,
                  dataPoints:[
                    {label: "Barbell deadlifts", y: 14},
                     {label: "Push-ups (or dips)", y: 10},
                     {label: "Pull-ups (or Inverted Rows)", y: 11},
                     {label: "Incline dumbbell press", y: 9},
                     {label: "Running", y: 8},
                     {label: "Sit-Ups", y: 9},
                     {label: "Burpees", y: 12}
                  ]
                }];


      console.log(dataPoints);
      //dataPoints = data;
      /*chart*/
      this.chart = new CanvasJS.Chart("barChartContainer", {
        animationEnabled: true,
        title:{
          text: "Evolution Focus Session"
        },
        axisY: {
          title: "Duration (minutes)",
          titleFontColor: "#4F81BC",
          lineColor: "#4F81BC",
          labelFontColor: "#4F81BC",
          tickColor: "#4F81BC"
        },
        toolTip: {
          shared: true
        },
        legend: {
          cursor:"pointer",
          itemclick: this.toggleDataSeries
        },
        data: data

      });
      this.chart.render();
      /*end chart*/
    });
    $("#viewModal").modal('show');
  }

  toggleDataSeries(e) {
    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
      e.dataSeries.visible = false;
    }
    else {
      e.dataSeries.visible = true;
    }
    this.chart.render();
  }
}


