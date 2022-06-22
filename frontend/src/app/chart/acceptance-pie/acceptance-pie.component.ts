import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-acceptance-pie',
  templateUrl: './acceptance-pie.component.html',
  styleUrls: ['./acceptance-pie.component.css']
})
export class AcceptancePieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const completionPie = new Chart("acceptance-pie", {
      type: 'doughnut',
      data: {
        labels: ["Accepted", "Rejected"],
        datasets: [
          {
            label: "Completion of Posts",
            backgroundColor: ['#EC6B56', '#FFC154'],
            data: [82, 18]
          }
        ]
      },
      options: {responsive: false} 
      
    })

  }

}
