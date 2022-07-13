import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-new',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  tabIndex: number;
  tabList: string[];
  constructor(private router: Router) {}
  ngOnInit(): void {
    this.tabList = [
      'overview',
      'processed',
      'pending',
      'developertools',
      'settings',
    ];
    if (this.router.url.includes(this.tabList[0])) this.tabIndex = 0;
    else if (this.router.url.includes(this.tabList[1])) this.tabIndex = 1;
    else if (this.router.url.includes(this.tabList[2])) this.tabIndex = 2;
    else if (this.router.url.includes(this.tabList[3])) this.tabIndex = 3;
    else if (this.router.url.includes(this.tabList[4])) this.tabIndex = 4;
  }

  onTabClick(index: number) {
    this.tabIndex = index;
    if (this.router.url.includes(this.tabList[0]) && index == 0) return;
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate([`/home/${this.tabList[index]}`]));
  }
}
