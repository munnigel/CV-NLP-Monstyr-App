import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.css'],
})
export class OverviewPageComponent implements OnInit {
  constructor(
    private titleService: Title,
    private dataSrv: DataService,
    private router: Router
  ) {}
  acceptancePie: Chart;
  completionPie: Chart;
  latencyBar: Chart;

  async ngOnInit() {
    this.titleService.setTitle('Overview');
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
            this.acceptancePie = new Chart('acceptance-pie', {
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
    let ODLatency;
    let NERTitleLatency;
    let NERCategoriesLatency;
    let NERDateLatency;
    this.dataSrv.getODlatency().subscribe({
      next: (res) => {
        ODLatency = res['odlatency'];
      },
      error: () => {},
      complete: () => {
        this.dataSrv.getNERTitleLatency().subscribe({
          next: (res2) => {
            NERTitleLatency = res2['nertitlelatency'];
          },
          error: () => {},
          complete: () => {
            this.dataSrv.getNERCategoriesLatency().subscribe({
              next: (res3) => {
                NERCategoriesLatency = res3['nercategorieslatency'];
              },
              error: () => {},
              complete: () => {
                this.dataSrv.getNERDateLatency().subscribe({
                  next: (res4) => {
                    NERDateLatency = res4['nerdatelatency'];
                  },
                  error: () => {},
                  complete: () => {
                    console.log(ODLatency);
                    console.log(NERTitleLatency);
                    console.log(NERCategoriesLatency);
                    console.log(NERDateLatency);
                    this.latencyBar = new Chart('latency-bar', {
                      type: 'bar',
                      data: {
                        labels: [
                          'Tag Generation',
                          'Title Generation',
                          'Category Generation',
                          'Date Generation',
                        ],
                        datasets: [
                          {
                            label: 'Latencies',
                            data: [
                              // this.dataSrv.OCRLatency,
                              ODLatency,
                              NERTitleLatency,
                              NERCategoriesLatency,
                              NERDateLatency,
                            ],
                            backgroundColor: [
                              // 'rgba(255, 99, 132, 0.5)',
                              'rgba(54, 162, 235, 0.5)',
                              'rgba(255, 206, 86, 0.5)',
                              'rgba(75, 192, 192, 0.5)',
                              'rgba(153, 102, 255, 0.5)',
                              'rgba(255, 159, 64, 0.5)',
                            ],
                            borderColor: [
                              // 'rgba(255, 99, 132, 1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                              'rgba(153, 102, 255, 1)',
                              'rgba(255, 159, 64, 1)',
                            ],
                            borderWidth: 4,
                          },
                        ],
                      },
                      options: {
                        scales: {
                          y: {
                            beginAtZero: true,
                          },
                        },
                        responsive: false,
                      },
                    });
                  },
                });
              },
            });
          },
        });
      },
    });
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
