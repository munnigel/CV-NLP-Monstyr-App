import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

  async ngOnInit() {
    try {
      await this.dataSrv.updateOverviewData();
    } catch (err) {
      console.log(err);
      localStorage.removeItem('loginToken');
      this.router.navigate(['/']);
      return;
    }
    this.titleService.setTitle('Overview');
  }
}
