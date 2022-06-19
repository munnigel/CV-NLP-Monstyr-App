import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { PendingProduct } from '../pending-product.model';
import { Product } from '../product.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit {
  tabIndex: number;
  showItem: boolean;
  productList: Product[];
  pendingProductList: PendingProduct[];
  constructor(private dataSrv: DataService) {}

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

  onFilter(index: number) {}
}
