import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import * as CanvasJS from '../../../assets/js/canvasjs.min';
import { CurrentCustomerService } from '../../current-customer.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { CustomerDashboard, CurrentCustomer, Ranking } from '../../gym.model';

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
  //lstPoint = new Array();
  //lstCalorie = new Array();

  //Ranking
  lstTopRanking: Ranking[];
  ranks: Array<Ranking>;

  //Health Status
  currentPoint: number;
  totalPoints: number;


  //used for integration
  userId = '2';

  customerDashboard: CustomerDashboard;
  currentCustomer: CurrentCustomer;

  constructor(private router: Router,
              private currentCustomerService: CurrentCustomerService) { }

  ngOnInit() {
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

    //View health status
    /*setTimeout(function(){
    }, 3000);*/

    //Display bar chart
    this.loadHistoryPoint();

    //Display line chart
    this.loadHistoryCalorie();

    //Display Gamification
    this.loadHealthPercent();

    //Display Ranking
    this.loadTopRanking();


  }//ok

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

  }//ok

  gotoUserProfile(){
    this.router.navigate(['/user-profile']);
  }//ok

   /*Load Dashboard*/
   loadCurrentCustomer(){

       this.getCurrentCustomer(this.userId).subscribe(data => {
          console.log(data);
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
                }]//ok
              });

              piechart.render();
       });

   }


   loadHealthPercent(){
      this.getHealthPercent(this.userId).subscribe(data => {
          console.log(data);
          this.percentHealth = data;
          this.fillHealthStatus(this.percentHealth);
      });
   }//ok


   loadHistoryPoint(){
      this.currentCustomerService.getHistoryPoint(this.userId).subscribe(data => {

          console.log(data);
          this.lstPoint = data;
          console.log(this.lstPoint.length);

          let y1 = this.lstPoint[0];
          let y2 = this.lstPoint[1];
          let y3 = this.lstPoint[2];
          let y4 = this.lstPoint[3];
          /* Bar chart */
          let chart = new CanvasJS.Chart("barChartContainer", {
                      animationEnabled: true,
                      exportEnabled: true,
                      title: {
                        text: "History Points"
                      },
                      data: [{
                        type: "column",
                        dataPoints: [
                          /*for(var i=0; i<this.lstPoint.length; i++; ){
                             {y: this.lstPoint[0], label: "Session 1" },
                          }*/
                          { y: y1, label: "S1" },
                          { y: y2, label: "S2" },
                          { y: y3, label: "S3" },
                          { y: y4, label: "S4" }

                        ]
                      }]
                    });

          chart.render();
      });

   }//ok

   loadHistoryCalorie(){

      this.currentCustomerService.getHistoryCalorie(this.userId).subscribe(data => {

          //console.log(data);
          this.lstCalorie = data;
          let y1 = this.lstCalorie[0];
          let y2 = this.lstCalorie[0] + this.lstCalorie[1];
          let y3 = this.lstCalorie[0] + this.lstCalorie[1] + this.lstCalorie[2];
          let y4 = this.lstCalorie[0] + this.lstCalorie[1] + this.lstCalorie[2] + this.lstCalorie[3];
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
              dataPoints: [
                            { y: y1, label: "S1" },
                            { y: y2, label: "S2" },
                            { y: y3, label: "S3" },
                            { y: y4, label: "S4" }
                          ]
            }]
          });

          linechart.render();
      });

   }

   loadTopRanking(){
      this.getTopRanking(this.userId).subscribe(data => {
        console.log(data);
        this.lstTopRanking = data;
        this.ranks = [...this.lstTopRanking];
      });
   }


   //Prepare current training result of customer
   getCurrentCustomer(userId){
   //alert(11);
        return this.currentCustomerService.getCurrentCustomer(userId);
   }

   //Prepare total training result of customer assigned by Coach
   getCustomerDashboard(userId){
      //alert(11);
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


   /*getPointsOfUser(userId)
      {
        return this.customerDashboardService.getPointsOfUser(userId);
      }

   getDurationsOfUser(userId)
       {
         return this.customerDashboardService.getDurationsOfUser(userId);
       }

   getCaloriesOfUser(userId)
       {
         return this.customerDashboardService.getCaloriesOfUser(userId);
       }

   getExercisesOfUser(userId)
       {
         return this.customerDashboardService.getExercisesOfUser(userId);
       }*/


}


