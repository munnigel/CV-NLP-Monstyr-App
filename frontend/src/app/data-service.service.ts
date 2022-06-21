import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { API_URL } from './env';
import { PendingProduct } from './pending-product.model';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  private productList: Product[];
  private pendingProductList: PendingProduct[];
  res: any;
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    console.log('getting');
    this.productList = [];
    this.pendingProductList = [];
    await this.updateProductList();
    await this.updatePendingProductList();
  }

  getProductList() {
    return this.productList;
  }

  getPendingProductList() {
    return this.pendingProductList;
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'mime-Type': 'application/json',
      'content-type': 'application/json',
    }),
  };

  async updateProductList() {
    this.res = await lastValueFrom(
      this.http.get(`${API_URL}/pendings.json`, this.httpOptions)
    );
    console.log(this.res);
    for (let i = 0; i < this.res.length; i++) {
      this.productList.push(
        new Product(
          this.res[i].imgUrl,
          this.res[i].title,
          this.res[i].category,
          this.res[i].promotionDate,
          this.res[i].description
        )
      );
    }
  }

  async updatePendingProductList() {
    this.res = await lastValueFrom(
      this.http.get(`${API_URL}/pending_posts.json`, this.httpOptions)
    );
    console.log(this.res);
    for (let i = 0; i < this.res.length; i++) {
      this.pendingProductList.push(
        new PendingProduct(
          this.res[i].score,
          this.res[i].img,
          this.res[i].title,
          this.res[i].description
        )
      );
    }

    // this.pendingProductList = [
    //   new PendingProduct(1, '../../assets/pictures/image1.png', 'description1'),
    //   new PendingProduct(2, '../../assets/pictures/image2.png', 'description2'),
    //   new PendingProduct(3, '../../assets/pictures/image3.jpg', 'description3'),
    //   new PendingProduct(4, '../../assets/pictures/image4.jpg', 'description4'),
    //   new PendingProduct(5, '../../assets/pictures/image5.jpg', 'description5'),
    // ];
  }
}
