import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
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
  postForm: FormGroup;

  constructor(
    private router: Router,
    private titleService: Title,
    private dataSrv: DataService,
    private cookieSrv: CookieService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Login');
    this.postForm = this.fb.group({
      email: [''],
      password: [''],
    });
  }

  async onLogin() {
    let token = '';
    var formData: any = new FormData();
    formData.append('email', this.postForm.get('email').value);
    formData.append('password', this.postForm.get('password').value);
    this.dataSrv.login(formData).subscribe({
      next: (data) => {
        console.log(data);
        token = data['token'];
        console.log(token);
        this.cookieSrv.set('loginToken', token);
      },
      error: (err) => {
        console.log(err);
      },
    });
    // console.log('getting');

    // this.productList = [];
    // this.liveProductList = [];
    // this.pendingProductList = [];
    // this.dataSrv.setPendingTab(1);
    // this.dataSrv.setLiveTab(1);
    // await this.dataSrv.updateAllProductList();
    // await this.dataSrv.updateOverviewData();
    // this.router.navigate(['/home'], {});
  }

  onCreate() {
    this.router.navigate(['/add'], {});
  }
}
