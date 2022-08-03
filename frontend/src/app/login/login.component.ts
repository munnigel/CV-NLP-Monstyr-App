import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DataService } from '../data-service.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  productList: Product[] = [];
  liveProductList: Product[] = [];
  pendingProductList: Product[] = [];

  constructor(
    private router: Router,
    private titleService: Title,
    private dataSrv: DataService,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle('Login')
  }

  async onLogin() {
    console.log('getting');

    this.productList = [];
    this.liveProductList = [];
    this.pendingProductList = [];
    this.dataSrv.setPendingTab(1);
    this.dataSrv.setLiveTab(1);
    await this.dataSrv.updateAllProductList();
    await this.dataSrv.updateOverviewData();
    this.router.navigate(['/home'], {});
  }

  onCreate() {
    this.router.navigate(['/add'], {})
  }



}
