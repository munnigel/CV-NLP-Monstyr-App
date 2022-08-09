import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Account } from '../account.model';
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
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.titleService.setTitle('Login');
    this.postForm = this.fb.group({
      email: [''],
      password: [''],
    });
    this.dataSrv.getNoOfLivePosts().subscribe({
      next: () => {},
      error: () => {
        console.log('needs login');
      },
      complete: () => {
        this.router.navigate(['/home']);
      },
    });
  }

  async onLogin() {
    let regex = new RegExp('[a-z0-9]+@[mymail]+.[sutd]+.[edu]+.[sg]');
    let regex2 = new RegExp('[a-z0-9]+@[monstyr]+.[com]');
    let regex3 = new RegExp('[a-z0-9]+@[gmail]+.[com]');
    if (
      this.postForm.get('email').value === '' ||
      (regex.test(this.postForm.get('email').value) === false &&
        regex2.test(this.postForm.get('email').value) === false &&
        regex3.test(this.postForm.get('email').value) === false)
    ) {
      alert(
        'Email is required, and email has to be either @mymail.sutd.edu.sg or @monstyr.com or @gmail.com'
      );
      return;
    } else if (
      this.postForm.get('password').value === '' ||
      this.postForm.get('password').value.length < 6
    ) {
      alert('Password is required and has to be at least 6 characters long');
      return;
    }
    let token = '';
    let id: number;
    var formData: any = new FormData();
    formData.append('email', this.postForm.get('email').value);
    formData.append('password', this.postForm.get('password').value);
    this.dataSrv.login(formData).subscribe({
      next: (data) => {
        console.log(data);
        token = data['token'];
        console.log(token);
        localStorage.setItem('loginToken', token);
        console.log('set token');
        id = data['id'];
      },
      error: (err) => {
        if (err.error.error == 'unauthorized')
          alert('Please check login details. Wrong email/password');
      },
      complete: () => {
        let currentUser: Account;
        this.dataSrv.getCurrentUserInfo(id).subscribe({
          next: (res) => {
            currentUser = new Account(
              res['name'],
              res['username'],
              res['email'],
              res['password_digest'],
              res['account_type'],
              res['profile_pic']
            );
          },
          error: () => {},
          complete: () => {
            this.dataSrv.setCurrentUser(currentUser);
            this.router.navigate(['/home']);
          },
        });
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
