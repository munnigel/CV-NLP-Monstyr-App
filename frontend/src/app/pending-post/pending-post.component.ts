import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Product } from '../product.model';

@Component({
  selector: 'app-pending-post-page',
  templateUrl: './pending-post.component.html',
  styleUrls: ['./pending-post.component.css'],
})
export class PendingPostPageComponent implements OnInit {
  pendingProductList: Product[];
  currentPage: number;
  maxPage: number;
  constructor(
    private dataSrv: DataService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.dataSrv.getAllPendingProductList().subscribe({
      next: (res) => {
        this.pendingProductList = [];
        this.dataSrv.createAndStoreProductList(this.pendingProductList, res);
      },
      error: () => {
        console.log('error getting pending product');
        this.router.navigate(['/']);
      },
      complete: () => {
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
      },
    });
    this.titleService.setTitle('pending-posts');
  }

  nextPage() {
    if (this.currentPage < this.maxPage) {
      this.pendingProductList = [];
      this.dataSrv.setPendingTab(this.currentPage + 1);
      this.dataSrv.getAllPendingProductList().subscribe({
        next: (res) => {
          this.dataSrv.createAndStoreProductList(this.pendingProductList, res);
        },
        error: () => {
          console.log('error getting pending products');
          this.router.navigate(['/']);
        },
        complete: () => {
          this.currentPage += 1;
        },
      });
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.pendingProductList = [];
      this.dataSrv.setPendingTab(this.currentPage - 1);
      this.dataSrv.getAllPendingProductList().subscribe({
        next: (res) => {
          this.dataSrv.createAndStoreProductList(this.pendingProductList, res);
        },
        error: () => {
          console.log('error getting pending products');
          this.router.navigate(['/']);
        },
        complete: () => {
          this.currentPage -= 1;
        },
      });
    }
  }

  onFilter(index: number) {}

  selectPost(index: number) {
    console.log(index);
    console.log(this.pendingProductList[index]);
    this.router.navigate([`/edit/${this.pendingProductList[index].id}`], {});
  }
}
