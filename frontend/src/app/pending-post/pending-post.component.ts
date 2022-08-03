import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Product } from '../product.model';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pending-post-page',
  templateUrl: './pending-post.component.html',
  styleUrls: ['./pending-post.component.css'],
})
export class PendingPostPageComponent implements OnInit {
  tabIndex: number;
  showItem: boolean;
  pendingProductList: Product[];
  constructor(
    private dataSrv: DataService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.tabIndex = 2;
    this.showItem = false;
    this.pendingProductList = this.dataSrv.getPendingProductList();
    if (!this.pendingProductList) {
      this.router.navigate(['/']);
      return;
    }
    console.log(this.pendingProductList[0]);
    console.log(this.pendingProductList);
    this.titleService.setTitle('pending-posts');
  }

  async nextPage() {
    try {
      this.dataSrv.nextPendingTab();
    } catch (err) {
      console.log(err);
      localStorage.removeItem('loginToken');
      this.router.navigate(['/']);
      return;
    }
    await this.dataSrv.updateAllProductList();
    this.pendingProductList = this.dataSrv.getPendingProductList();
  }

  async prevPage() {
    this.dataSrv.prevPendingTab();
    await this.dataSrv.updateAllProductList();
    this.pendingProductList = this.dataSrv.getPendingProductList();
  }

  onTabClick(index: number) {
    this.tabIndex = index;
  }

  onItemClick() {
    this.showItem = true;
  }

  onFilter(index: number) {}

  selectPost(index: number) {
    console.log(index);
    console.log(this.pendingProductList[index]);
    this.router.navigate([`/edit/${this.pendingProductList[index].id}`], {});
  }
}
