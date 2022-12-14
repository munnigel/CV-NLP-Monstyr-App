import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-home-page-new',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  tabIndex: number;
  tabList: string[];
  sideNavOpen: boolean;
  sidePadding: boolean;
  getScreenWidth: number;
  getScreenHeight: number;
  mobile: boolean;
  opened: boolean;
  sideNavMode;

  constructor(private router: Router, private dataSrv: DataService) {}

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreenWidth = window.innerWidth;
    this.getScreenHeight = window.innerHeight;
    if (this.getScreenWidth < 900) {
      this.mobile = true;
      this.opened = false;
      this.sideNavMode = 'over';
    } else {
      this.mobile = false;
      this.opened = true;
      this.sideNavMode = 'side';
    }
  }

  ngOnInit() {
    console.log('home page');
    this.onWindowResize();
    this.opened = !this.mobile;
    this.tabList = ['overview', 'processed', 'pending', 'addpost', 'Logout'];
    if (this.router.url.includes(this.tabList[0])) this.tabIndex = 0;
    else if (this.router.url.includes(this.tabList[1])) {
      console.log(1);
      this.tabIndex = 1;
    } else if (this.router.url.includes(this.tabList[2])) {
      console.log(2);
      this.tabIndex = 2;
    } else if (this.router.url.includes(this.tabList[3])) {
      console.log(3);
      this.tabIndex = 3;
    } else if (this.router.url.includes(this.tabList[4])) {
      console.log(5);
      this.tabIndex = 4;
    }
  }
  async onTabClick(index: number) {
    console.log(this.mobile);
    if (this.mobile) this.opened = false;
    console.log(this.opened);
    if (index == 4) {
      console.log('logout');
      localStorage.removeItem('loginToken');
      this.router.navigate(['/']);
    }
    this.tabIndex = index;
    this.router.navigate([`/home/${this.tabList[index]}`]);
  }

  toggleSideNav() {
    // console.log('test');
    if (this.mobile) {
      console.log('switch');
      this.opened = !this.opened;
      console.log(this.opened);
    }
  }
  toggleOutsideSideNav() {
    // console.log('test');
    if (this.mobile) this.opened = false;
  }
}
