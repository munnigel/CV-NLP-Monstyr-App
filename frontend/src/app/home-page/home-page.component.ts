import { Component, OnInit } from '@angular/core';
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
    this.tabIndex = 0;
    this.tabList = [
      'overview',
      'processed',
      'pending',
      'developertools',
      'settings',
    ];
  }

  onTabClick(index: number) {
    this.tabIndex = index;
    this.router.navigate([`/home/${this.tabList[index]}`]);
  }
}
