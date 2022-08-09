import { Component, OnInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js';
import { DataService } from 'src/app/data-service.service';

@Component({
  selector: 'app-latency-bar',
  templateUrl: './latency-bar.component.html',
  styleUrls: ['./latency-bar.component.css'],
})
export class LatencyBarComponent implements OnInit {
  constructor(private dataSrv: DataService) {}
  latencyBar: Chart;
  ngOnInit(): void {
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
                              this.dataSrv.ODLatency,
                              this.dataSrv.NERTitleLatency,
                              this.dataSrv.NERCategoriesLatency,
                              this.dataSrv.NERDateLatency,
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
  }
  ngOnDestroy() {
    this.latencyBar.destroy();
  }
}
