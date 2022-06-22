import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-accuracy-line',
  templateUrl: './accuracy-line.component.html',
  styleUrls: ['./accuracy-line.component.css']
})
export class AccuracyLineComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const accuracyLine = new Chart("accuracy-line", {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7],
        datasets: [
          {
            label: "OCR",
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            data: [65, 68, 80, 80, 80, 80, 87]
          },
          {
            label: "OD",
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            data: [57, 84, 85, 85, 85, 85, 87]
          },
          {
            label: "NER",
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            data: [64, 67, 74, 73, 70, 78, 79]
          },
          {
            label: "Keyword Ext",
            backgroundColor: "rgba(100, 192, 192, 0.4)",
            data: [34, 84, 85, 85, 85, 85, 87]
          }

        ]
      },
      options: {responsive:false}
      
    })

  }

}
