import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-home-page-new',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  tabIndex: number;
  tabList: string[];
  constructor(private router: Router, private dataSrv: DataService) {}
  ngOnInit(): void {
    this.tabList = [
      'overview',
      'processed',
      'pending',
      'developertools',
      'addpost',
      'settings',
      'Logout',
    ];
    if (this.router.url.includes(this.tabList[0])) this.tabIndex = 0;
    else if (this.router.url.includes(this.tabList[1])) this.tabIndex = 1;
    else if (this.router.url.includes(this.tabList[2])) this.tabIndex = 2;
    else if (this.router.url.includes(this.tabList[3])) this.tabIndex = 3;
    else if (this.router.url.includes(this.tabList[4])) this.tabIndex = 4;
    else if (this.router.url.includes(this.tabList[5])) this.tabIndex = 5;
  }

  async onTabClick(index: number) {
    if (index == 6) {
      console.log('logout');
      localStorage.removeItem('loginToken');
      this.router.navigate(['/']);
    }
    this.tabIndex = index;
    if (index == 0) {
      try {
        await this.dataSrv.updateOverviewData();
      } catch (err) {
        console.log(err);
        localStorage.removeItem('loginToken');
        this.router.navigate(['/']);
        return;
      }
    } else if (index == 1) {
      try {
        await this.dataSrv.updateAllLiveProductList();
      } catch (err) {
        console.log(err);
        localStorage.removeItem('loginToken');
        this.router.navigate(['/']);
        return;
      }
    } else if (index == 2) {
      try {
        await this.dataSrv.updateAllPendingProductList();
      } catch (err) {
        console.log(err);
        localStorage.removeItem('loginToken');
        this.router.navigate(['/']);
        return;
      }
    }
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([`/home/${this.tabList[index]}`]));
  }
}
