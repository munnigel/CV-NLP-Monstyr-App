import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { API_URL } from './env';
import { PendingPostPageComponent } from './pending-post-page/pending-post-page.component';
import { PendingProduct } from './pending-product.model';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  private liveProductList: Product[];
  private pendingProductList: PendingProduct[];
  res: any;
  private checkEditing = new BehaviorSubject<boolean>(false);
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    console.log('getting');
    this.liveProductList = [];
    this.pendingProductList = [];
    await this.updateLiveProductList();
    await this.updatePendingProductList();
  }

  setEditingStatus(newValue:boolean) {
    this.checkEditing.next(newValue);
  }

  getEditingStatus() {
    return this.checkEditing.asObservable();
  }

  getLiveProductList() {
    return this.liveProductList;
  }

  getPendingProductList() {
    return this.pendingProductList;
  }

  private httpOptions = {
    headers: new HttpHeaders({
      // "Accept": "*/*",
      "Accept": "application/json",
      'Content-Type': 'application/json',
    }),
  };

  async updateLiveProductList() {
    this.res = await lastValueFrom(
      this.http.get(`${API_URL}/liveposts.json`, this.httpOptions)
    );
    console.log(this.res);
    for (let i = 0; i < this.res.length; i++) {
      this.liveProductList.push(
        new Product(
          this.res[i].title,
          this.res[i].category,
          this.res[i].promotionDate,
          this.res[i].description,
          this.res[i].id,
          this.res[i].imgUrl
        )
      );
    }
  }

  async updatePendingProductList() {
    this.res = await lastValueFrom(
      this.http.get(`${API_URL}/pendingposts.json`, this.httpOptions)
    );
    console.log(this.res);
    for (let i = 0; i < this.res.length; i++) {
      this.pendingProductList.push(
        new PendingProduct(
          this.res[i].category,
          this.res[i].imgUrl,
          this.res[i].title,
          this.res[i].description,
          this.res[i].promotionDate,
          this.res[i].id,
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

  updateLivePost(product: Product): Observable<Product> {
    console.log(product);
    let temp = new Product(
      product.title,
      product.category,
      product.promotionDate,
      product.description
    );
    return this.http.put<Product>(
      `${API_URL}/liveposts/${product.id}`,
      temp,
      this.httpOptions
    );
  }

  updatePendingPost(pendingProduct: PendingProduct): Observable<PendingProduct> {
    console.log(pendingProduct)
    let temp = new PendingProduct(pendingProduct.category, pendingProduct.imgUrl, pendingProduct.title, pendingProduct.description, pendingProduct.promotionDate)
    return this.http.put<PendingProduct>(`${API_URL}/pendingposts/${pendingProduct.id}`, temp, this.httpOptions);
  }

  addLivePost(product: Product): Observable<Product> {
    console.log(product)
    let temp = new Product(product.title, product.category, product.promotionDate, product.description)
    return this.http.post<Product>(`${API_URL}/liveposts`, temp, this.httpOptions);
  }

  deletePendingPost(pendingProduct: PendingProduct): Observable<PendingProduct> {
    return this.http.delete<PendingProduct>(`${API_URL}/pendingposts/${pendingProduct.id}`, this.httpOptions);
  }

}
