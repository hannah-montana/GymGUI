import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as CanvasJS from '../../../assets/js/canvasjs.min';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  percentHealth: Number;

  constructor(private router: Router) { }

  ngOnInit() {
    this.percentHealth = 0;
    /* Bar chart */
    let chart = new CanvasJS.Chart("chartContainer", {
            		animationEnabled: true,
            		exportEnabled: true,
            		title: {
            			text: "Duration in 3 months"
            		},
            		data: [{
            			type: "column",
            			dataPoints: [
            				{ y: 100, label: "w1" },
            				{ y: 120, label: "w2" },
            				{ y: 150, label: "w3" },
            				{ y: 95, label: "w4" },
            				{ y: 83, label: "w5" },
            				{ y: 170, label: "w6" },
            				{ y: 100, label: "w7" },
            				{ y: 120, label: "w8" },
            				{ y: 50, label: "w9" },
                    { y: 110, label: "w10" },
                    { y: 140, label: "w11" },
                    { y: 175, label: "w12" }
            			]
            		}]
            	});

    chart.render();

    /* Line chart */
    let dataPoints = [];
    let y = 0;
    let linechart = new CanvasJS.Chart("lineChartContainer", {
      zoomEnabled: true,
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Point in 3 months"
      },
      subtitles:[{
        text: ""
      }],
      data: [
      {
        type: "line",
        dataPoints: [
                      { y: 20, label: "w1" },
                      { y: 30, label: "w2" },
                      { y: 50, label: "w3" },
                      { y: 30, label: "w4" },
                      { y: 20, label: "w5" },
                      { y: 50, label: "w6" },
                      { y: 40, label: "w7" },
                      { y: 60, label: "w8" },
                      { y: 75, label: "w9" },
                      { y: 50, label: "w10" },
                      { y: 80, label: "w11" },
                      { y: 90, label: "w12" }
                    ]
      }]
    });

    linechart.render();


    /* Pie chart */
    let piechart = new CanvasJS.Chart("pieChartContainer", {
      theme: "light2",
      animationEnabled: true,
      exportEnabled: true,
      title:{
        text: "Exercise Type"
      },
      data: [{
        type: "pie",
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
        indexLabel: "{name} - #percent%",
        dataPoints: [
          { y: 100, name: "Easy" },
          { y: 170, name: "Medium" },
          { y: 300, name: "Difficult" }
        ]
      }]
    });

    piechart.render();

    //View health status
    this.percentHealth = 91;
    this.fillHealthStatus(this.percentHealth);

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

}
