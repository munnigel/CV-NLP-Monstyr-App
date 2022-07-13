import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { API_URL } from 'src/environments/environment';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  private productList: Product[];
  private liveProductList: Product[];
  private pendingProductList: Product[];
  constructor(private http: HttpClient) {}

  async ngOnInit() {
    console.log('getting');
    this.productList = [];
    await this.updateAllProductList();
    console.log(API_URL);
  }

  async setEditingStatus(id: number) {
    await lastValueFrom(
      this.http.put(
        `${API_URL}/posts/${id}`,
        { status: 'editing' },
        this.httpOptions
      )
    );
  }

  getLiveProductList() {
    return this.liveProductList;
  }

  getPendingProductList() {
    return this.pendingProductList;
  }

  async getEditingStatus(id: number) {
    let res = await lastValueFrom(this.http.get(`${API_URL}/posts/${id}`));
    return res[0].status == 'editing';
  }

  getProductList() {
    return this.productList;
  }

  private httpOptions = {
    headers: new HttpHeaders({
      // "Accept": "*/*",
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }),
  };

  async updateAllProductList() {
    let res: any = await lastValueFrom(
      this.http.get(`${API_URL}/posts.json`, this.httpOptions)
    );
    console.log(res);
    for (let i = 0; i < res.length; i++) {
      let temp = new Product(
        res[i].id,
        res[i].sp_id,
        res[i].pid,
        res[i].status,
        res[i].gen_title,
        res[i].title,
        res[i].gen_categories,
        res[i].categories,
        res[i].gen_start_date,
        res[i].start_date,
        res[i].gen_end_date,
        res[i].end_date,
        res[i].gen_tags,
        res[i].tags,
        res[i].gen_content,
        res[i].content,
        res[i].od_image,
        res[i].ocr_image,
        res[i].images,
        res[i].score,
        res[i].created_at,
        res[i].updated_at,
        res[i].od_latency,
        res[i].ocr_latency,
        res[i].ner_date_latency,
        res[i].ner_categories_latency,
        res[i].ner_title_latency
      );
      if (temp.status == 'live') this.liveProductList.push(temp);
      else if (temp.status == 'pending') this.pendingProductList.push(temp);
      this.productList.push(temp);
      console.log(this.productList);
    }
  }

  updatePost(product: Product): Observable<Product> {
    console.log(product);
    return this.http.put<Product>(
      `${API_URL}/posts/${product.id}`,
      product,
      this.httpOptions
    );
  }
}

// {"id":1,
// "title":null,
// "created_at":"2022-07-13T08:38:48.030Z",
// "updated_at":"2022-07-13T08:38:48.574Z",
// "sp_id":null,
// "pid":null,
// "status":null,
// "gen_title":null,
// "gen_categories":null,
// "categories":null,
// "gen_start_date":null,
// "start_date":null,
// "gen_end_date":null,
// "end_date":null,
// "gen_tags":null,
// "tags":null,
// "od_image":null,
// "ocr_image":null,
// "gen_content":null,
// "images":"http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBHdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9714dd87916dff1be62ef13bb09b27f86d196c0c/ESC_SDS%20Project%20UML%20Use%20Case%20Diagram%20-%20UML%20Class%20diagram.png",
// "content":null,
// "score":null,
// "od_latency":null,
// "ocr_latency":null,
// "ner_date_latency":null,
// "ner_categories_latency":null,
// "ner_title_latency":null}
