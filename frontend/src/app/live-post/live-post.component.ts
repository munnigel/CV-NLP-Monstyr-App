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
  searchTerm: string;

  filteredProductList: Product[];
  constructor(
    private dataSrv: DataService,
    private router: Router,
    private titleService: Title
  ) {}

  async ngOnInit() {
    this.tabIndex = 2;
    this.showItem = false;
    this.liveProductList = this.dataSrv.getLiveProductList();
    if (!this.liveProductList) {
      await this.dataSrv.updateAllLiveProductList();
      this.liveProductList = this.dataSrv.getLiveProductList();
    }
    console.log(this.liveProductList[0]);
    console.log(this.liveProductList);
    this.titleService.setTitle('live-posts');
    this.filteredProductList = this.liveProductList;
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
