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
  showItem: boolean;
  pendingProductList: Product[];
  currentPage: number;
  maxPage: number;
  constructor(
    private dataSrv: DataService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.showItem = false;
    this.pendingProductList = this.dataSrv.getPendingProductList();
    if (!this.pendingProductList) {
      this.router.navigate(['/']);
      return;
    }
    console.log(this.pendingProductList[0]);
    console.log(this.pendingProductList);
    this.titleService.setTitle('pending-posts');
    this.currentPage = 1;
    this.dataSrv.getNoOfPendingPosts().subscribe({
      next: (res: any) => {
        let temp = res.noofpendingposts;
        this.maxPage = Math.ceil(temp / 15);
      },
      error: () => {},
      complete: () => {
        console.log('get max page');
        console.log(this.maxPage);
      },
    });
  }

  async nextPage() {
    try {
      if (this.currentPage < this.maxPage) {
        this.dataSrv.setPendingTab(this.currentPage + 1);
        await this.dataSrv.updateAllProductList();
        this.pendingProductList = this.dataSrv.getPendingProductList();
        this.currentPage += 1;
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('loginToken');
      this.router.navigate(['/']);
      return;
    }
  }

  async prevPage() {
    try {
      if (this.currentPage > 1) {
        this.dataSrv.setPendingTab(this.currentPage - 1);
        await this.dataSrv.updateAllProductList();
        this.pendingProductList = this.dataSrv.getPendingProductList();
        this.currentPage -= 1;
      }
    } catch (err) {
      console.log(err);
      localStorage.removeItem('loginToken');
      this.router.navigate(['/']);
      return;
    }
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
