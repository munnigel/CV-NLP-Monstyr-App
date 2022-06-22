import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { PendingProduct } from '../pending-product.model';
import { Product } from '../product.model';

@Component({
  selector: 'app-processed-post-page',
  templateUrl: './processed-post-page.component.html',
  styleUrls: ['./processed-post-page.component.css']
})
export class ProcessedPostPageComponent implements OnInit {

  tabIndex: number;
  showItem: boolean;
  liveProductList: Product[];
  pendingProductList: PendingProduct[];
  constructor(private dataSrv: DataService) { }

  ngOnInit(): void {
    this.tabIndex = 2;
    this.showItem = false;
    this.liveProductList = this.dataSrv.getLiveProductList();
  }

  onTabClick(index: number) {
    this.tabIndex = index;
  }

  onItemClick() {
    this.showItem = true;
  }

  onFilter(index: number) { }
}
