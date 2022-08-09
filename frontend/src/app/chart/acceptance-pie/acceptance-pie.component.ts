import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/data-service.service';

@Component({
  selector: 'app-acceptance-pie',
  templateUrl: './acceptance-pie.component.html',
  styleUrls: ['./acceptance-pie.component.css'],
})
export class AcceptancePieComponent implements OnInit {
  constructor(private dataSrv: DataService) {}
  completionPie: Chart;
  ngOnInit(): void {
    let acceptedAiMl;
    let rejectedAiMl;
    this.dataSrv.getacceptedAiML().subscribe({
      next: (res) => {
        acceptedAiMl = res['acceptedaiml'];
      },
      error: () => {},
      complete: () => {
        this.dataSrv.getrejectedAiML().subscribe({
          next: (res2) => {
            rejectedAiMl = res2['rejectedaiml'];
          },
          error: () => {},
          complete: () => {
            this.completionPie = new Chart('acceptance-pie', {
              type: 'doughnut',
              data: {
                labels: ['Accepted', 'Rejected'],
                datasets: [
                  {
                    label: 'Completion of Posts',
                    backgroundColor: ['#EC6B56', '#FFC154'],
                    data: [acceptedAiMl, rejectedAiMl],
                  },
                ],
              },
              options: { responsive: false },
            });
          },
        });
      },
    });
  }
}
