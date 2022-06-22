import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { PendingProduct } from '../pending-product.model';
import { Product } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pending-post-page',
  templateUrl: './pending-post-page.component.html',
  styleUrls: ['./pending-post-page.component.css'],
})
export class PendingPostPageComponent implements OnInit {
  tabIndex: number;
  showItem: boolean;
  pendingProductList: PendingProduct[];
  constructor(private dataSrv: DataService, private router: Router) { }

  ngOnInit(): void {
    this.tabIndex = 2;
    this.showItem = false;
    this.pendingProductList = this.dataSrv.getPendingProductList();
    console.log(this.pendingProductList);
  }

  onTabClick(index: number) {
    this.tabIndex = index;
  }

  onItemClick() {
    this.showItem = true;
  }

  onFilter(index: number) { }

  selectPost(index: number) {
    console.log(index);
    this.router.navigate([`/edit/${index}`], {});
  }
}
