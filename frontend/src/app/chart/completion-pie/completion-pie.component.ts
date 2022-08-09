import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/data-service.service';

@Component({
  selector: 'app-completion-pie',
  templateUrl: './completion-pie.component.html',
  styleUrls: ['./completion-pie.component.css'],
})
export class CompletionPieComponent implements OnInit {
  constructor(private dataSrv: DataService) {}
  completionPie: Chart;
  ngOnInit(): void {
    let livePercentage;
    let pendingPercentage;
    this.dataSrv.getNoOfLivePosts().subscribe({
      next: (res) => {
        livePercentage = res['noofliveposts'];
      },
      error: () => {},
      complete: () => {
        this.dataSrv.getNoOfPendingPosts().subscribe({
          next: (res2) => {
            pendingPercentage = res2['noofpendingposts'];
          },
          error: () => {},
          complete: () => {
            this.completionPie = new Chart('completion-pie', {
              type: 'doughnut',
              data: {
                labels: ['Live', 'Pending'],
                datasets: [
                  {
                    label: 'Completion of Posts',
                    backgroundColor: ['#228B22', '#AFE1AF'],
                    data: [livePercentage, pendingPercentage],
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
