import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';


@Component({
  selector: 'app-completion-pie',
  templateUrl: './completion-pie.component.html',
  styleUrls: ['./completion-pie.component.css']
})
export class CompletionPieComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    const completionPie = new Chart("completion-pie", {
      type: 'doughnut',
      data: {
        labels: ["Processed", "Pending"],
        datasets: [
          {
            label: "Completion of Posts",
            backgroundColor: ['#228B22', '#AFE1AF'],
            data: [65, 35]
          }
        ]
      },
      options: {responsive: false }
    })


  }

}
