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
    await this.updateProductList();
    this.updatePendingProductList();
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
      this.http.get(`${API_URL}/posts.json`, this.httpOptions)
    );
    console.log(this.res[0].title);
    this.productList = [
      new Product(
        '../../assets/pictures/image1.png',
        'img1',
        'cat1',
        'date1',
        'description1'
      ),
      new Product(
        '../../assets/pictures/image2.png',
        'img2',
        'cat2',
        'date2',
        'description2'
      ),
      new Product(
        '../../assets/pictures/image3.jpg',
        'img3',
        'cat3',
        'date3',
        'description3'
      ),
      new Product(
        '../../assets/pictures/image4.jpg',
        'img4',
        'cat4',
        'date4',
        'description4'
      ),
      new Product(
        '../../assets/pictures/image5.jpg',
        'img5',
        'cat5',
        'date5',
        'description5'
      ),
    ];
  }

  updatePendingProductList() {
    this.pendingProductList = [
      new PendingProduct(1, '../../assets/pictures/image1.png', 'description1'),
      new PendingProduct(2, '../../assets/pictures/image2.png', 'description2'),
      new PendingProduct(3, '../../assets/pictures/image3.jpg', 'description3'),
      new PendingProduct(4, '../../assets/pictures/image4.jpg', 'description4'),
      new PendingProduct(5, '../../assets/pictures/image5.jpg', 'description5'),
    ];
  }
}
