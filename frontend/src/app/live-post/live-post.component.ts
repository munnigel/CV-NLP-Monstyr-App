import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-live-post-page',
  templateUrl: './live-post.component.html',
  styleUrls: ['./live-post.component.css'],
})
export class LivePostPageComponent implements OnInit {
  tabIndex: number;
  showItem: boolean;
  liveProductList: Product[];
  constructor(
    private dataSrv: DataService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.tabIndex = 2;
    this.showItem = false;
    this.liveProductList = this.dataSrv.getLiveProductList();
    if (!this.liveProductList) {
      this.router.navigate(['/']);
      return;
    }
    console.log(this.liveProductList[0]);
    console.log(this.liveProductList);
    this.titleService.setTitle('live-posts');
  }

  async nextPage() {
    try {
      this.dataSrv.nextLiveTab();
    } catch (err) {
      console.log(err);
      localStorage.removeItem('loginToken');
      this.router.navigate(['/']);
      return;
    }
    await this.dataSrv.updateAllProductList();
    this.liveProductList = this.dataSrv.getLiveProductList();
  }

  async prevPage() {
    try {
      this.dataSrv.prevLiveTab();
    } catch (err) {
      console.log(err);
      localStorage.removeItem('loginToken');
      this.router.navigate(['/']);
      return;
    }
    await this.dataSrv.updateAllProductList();
    this.liveProductList = this.dataSrv.getLiveProductList();
  }

  onTabClick(index: number) {
    this.tabIndex = index;
  }

  onItemClick() {
    this.showItem = true;
  }

  onFilter(index: number) {}

  selectLivePost(index: number) {
    console.log(index);
    console.log(this.liveProductList[index]);
    this.router.navigate([`/editLive/${this.liveProductList[index].id}`], {});
  }
}
