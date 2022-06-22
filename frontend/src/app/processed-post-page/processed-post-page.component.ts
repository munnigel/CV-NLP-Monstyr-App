import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { PendingProduct } from '../pending-product.model';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-processed-post-page',
  templateUrl: './processed-post-page.component.html',
  styleUrls: ['./processed-post-page.component.css']
})
export class ProcessedPostPageComponent implements OnInit {

  tabIndex: number;
  showItem: boolean;
  productList: Product[];
  pendingProductList: PendingProduct[];
  constructor(private dataSrv: DataService, private router: Router) { }

  ngOnInit(): void {
    this.tabIndex = 2;
    this.showItem = false;
    this.productList = this.dataSrv.getProductList();
    this.pendingProductList = this.dataSrv.getPendingProductList();
  }

  onTabClick(index: number) {
    this.tabIndex = index;
  }

  onItemClick() {
    this.showItem = true;
  }

  onFilter(index: number) { }

  selectLivePost(index: number) {
    console.log(index);
    console.log(this.productList[index])
    this.router.navigate([`/editLive/${this.productList[index].id}`], {})
  }
}
