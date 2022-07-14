import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-processed-post-page',
  templateUrl: './processed-post-page.component.html',
  styleUrls: ['./processed-post-page.component.css'],
})
export class ProcessedPostPageComponent implements OnInit {
  tabIndex: number;
  showItem: boolean;
  liveProductList: Product[];
  constructor(
    private dataSrv: DataService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.tabIndex = 2;
    this.showItem = false;
    this.liveProductList = this.dataSrv.getLiveProductList();
    console.log(this.liveProductList[0]);
    console.log(this.liveProductList);
    this.titleService.setTitle('live-posts');
  }

  async nextPage() {
    this.dataSrv.nextLiveTab();
    await this.dataSrv.updateAllProductList();
    this.liveProductList = this.dataSrv.getLiveProductList();
  }

  async prevPage() {
    this.dataSrv.prevLiveTab();
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
