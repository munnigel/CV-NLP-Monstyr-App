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
  showItem: boolean;
  liveProductList: Product[];
  searchTerm: string;
  currentPage: number;
  maxPage: number;

  filteredProductList: Product[];
  constructor(
    private dataSrv: DataService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.showItem = false;
    this.dataSrv.getAllLiveProductList().subscribe({
      next: (res) => {
        this.liveProductList = [];
        this.dataSrv.createAndStoreProductList(this.liveProductList, res);
      },
      error: () => {
        console.log('error getting live product');
        this.router.navigate(['/']);
      },
      complete: () => {
        this.filteredProductList = this.liveProductList;
        this.currentPage = 1;
        this.dataSrv.getNoOfLivePosts().subscribe({
          next: (res: any) => {
            let temp = res.noofliveposts;
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
    this.titleService.setTitle('live-posts');
  }

  filterPosts(searchTerm: string) {
    console.log(searchTerm);
    if (!searchTerm) {
      this.filteredProductList = this.liveProductList;
      console.log('reset');
      return;
    }
    this.filteredProductList = this.liveProductList.filter((product) => {
      // console.log(product);
      // product.title.includes(searchTerm);
      if (product.title) {
        // console.log(product.title);
        // console.log(
        //   product.title.toLowerCase().includes(searchTerm.toLowerCase())
        // );
        return product.title.toLowerCase().includes(searchTerm.toLowerCase());
      } else return false;
    });
    console.log(this.filteredProductList);
    console.log('filter');
  }

  async nextPage() {
    if (this.currentPage < this.maxPage) {
      this.dataSrv.setLiveTab(this.currentPage + 1);
      this.dataSrv.getAllLiveProductList().subscribe({
        next: (res) => {
          this.dataSrv.createAndStoreProductList(this.liveProductList, res);
        },
        error: () => {
          console.log('error getting live products');
          this.router.navigate(['/']);
        },
        complete: () => {
          this.currentPage += 1;
        },
      });
    }
  }

  async prevPage() {
    if (this.currentPage > 1) {
      this.dataSrv.setLiveTab(this.currentPage - 1);
      this.dataSrv.getAllLiveProductList().subscribe({
        next: (res) => {
          this.dataSrv.createAndStoreProductList(this.liveProductList, res);
        },
        error: () => {
          console.log('error getting live products');
          this.router.navigate(['/']);
        },
        complete: () => {
          this.currentPage -= 1;
        },
      });
    }
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
