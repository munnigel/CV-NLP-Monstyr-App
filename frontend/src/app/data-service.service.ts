import { DatePipe } from '@angular/common';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { AI_URL, API_URL } from '../app/env';
import { Product } from './product.model';
import { Account } from './account.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class DataService implements OnInit {
  private productList: Product[];
  private liveProductList: Product[];
  private pendingProductList: Product[];
  dateExtracted: any;
  ODLatency: number;
  OCRLatency: number;
  NERDateLatency: number;
  NERCategoriesLatency: number;
  NERTitleLatency: number;
  pendingPercentage: number;
  livePercentage: number;
  acceptedAiMl: number;
  rejectedAiMl: number;
  private pendingTab: number;
  private liveTab: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    //   console.log('getting');
    //   this.productList = [];
    //   this.liveProductList = [];
    //   this.pendingProductList = [];
    this.setPendingTab(1);
    this.setLiveTab(1);
    //   await this.updateAllProductList();
    //   console.log(API_URL);
    //   await this.updateOverviewData();
  }

  private getHttpOptions() {
    let token = localStorage.getItem('loginToken');
    // console.log(token);
    // console.log({
    //   headers: new HttpHeaders({
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     Authorization: token,
    //   }),
    // });
    return {
      headers: new HttpHeaders({
        Accept: '*/*',
        Authorization: token,
      }),
    };
  }

  async renderMainPage() {
    console.log('getting');
    this.productList = [];
    this.liveProductList = [];
    this.pendingProductList = [];
    this.setPendingTab(1);
    this.setLiveTab(1);
    await this.updateAllProductList();
    console.log(API_URL);
    await this.updateOverviewData();
  }

  setPendingTab(i: number) {
    this.pendingTab = i;
  }
  getPendingTab() {
    return this.pendingTab;
  }

  setLiveTab(i: number) {
    this.liveTab = i;
  }
  getLiveTab() {
    return this.liveTab;
  }

  async nextPendingTab() {
    console.log(this.pendingTab);
    if (this.pendingTab < (await this.getNoOfPendingPosts()) / 15) {
      this.pendingTab++;
    }
  }

  prevPendingTab() {
    console.log(this.pendingTab);
    if (this.pendingTab > 1) {
      this.pendingTab--;
    }
  }

  async getNoOfPendingPosts() {
    let token = localStorage.getItem('loginToken');
    let res: any = await lastValueFrom(
      this.http.get(`${API_URL}/noofpendingposts`, this.getHttpOptions())
    );

    console.log(res);
    return res.noofpendingposts;
  }

  async nextLiveTab() {
    console.log(this.liveTab);
    if (this.liveTab < (await this.getNoOfLivePosts()) / 15) {
      this.liveTab++;
    }
  }

  prevLiveTab() {
    console.log(this.liveTab);
    if (this.liveTab > 1) {
      this.liveTab--;
    }
  }

  async getNoOfLivePosts() {
    let token = localStorage.getItem('loginToken');
    let res: any = await lastValueFrom(
      this.http.get(`${API_URL}/noofliveposts`, this.getHttpOptions())
    );
    console.log(res);
    return res.noofliveposts;
  }

  async updateOverviewData() {
    let token = localStorage.getItem('loginToken');
    let ODLatency = await lastValueFrom(
      this.http.get(`${API_URL}/odlatency`, this.getHttpOptions())
    );
    this.ODLatency = ODLatency['odlatency'];
    let OCRLatency = await lastValueFrom(
      this.http.get(`${API_URL}/ocrlatency`, this.getHttpOptions())
    );
    this.OCRLatency = OCRLatency['ocrlatency'];
    let NERDateLatency = await lastValueFrom(
      this.http.get(`${API_URL}/nerdatelatency`, this.getHttpOptions())
    );
    this.NERDateLatency = NERDateLatency['nerdatelatency'];
    let NERCategoriesLatency = await lastValueFrom(
      this.http.get(`${API_URL}/nercategorieslatency`, this.getHttpOptions())
    );
    this.NERCategoriesLatency = NERCategoriesLatency['nercategorieslatency'];
    let NERTitleLatency = await lastValueFrom(
      this.http.get(`${API_URL}/nertitlelatency`, this.getHttpOptions())
    );
    this.NERTitleLatency = NERTitleLatency['nertitlelatency'];
    let pending = await lastValueFrom(
      this.http.get(`${API_URL}/noofpendingposts`, this.getHttpOptions())
    );

    let acceptedAiMl = await lastValueFrom(
      this.http.get(`${API_URL}/acceptedaiml`, this.getHttpOptions())
    );
    this.acceptedAiMl = acceptedAiMl['acceptedaiml'];

    let rejectedAiMl = await lastValueFrom(
      this.http.get(`${API_URL}/rejectedaiml`, this.getHttpOptions())
    );
    this.rejectedAiMl = rejectedAiMl['rejectedaiml'];

    let live = await lastValueFrom(
      this.http.get(`${API_URL}/noofliveposts`, {
        headers: new HttpHeaders({
          // "Accept": "*/*",
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: token,
        }),
      })
    );
    this.pendingPercentage = pending['noofpendingposts'];
    this.livePercentage = live['noofliveposts'];
  }

  async setEditingStatus(id: number) {
    let token = localStorage.getItem('loginToken');
    await lastValueFrom(
      this.http.put(
        `${API_URL}/posts/${id}`,
        { status: 'editing' },
        this.getHttpOptions()
      )
    );
  }

  makeTitle(id: number) {
    return this.http.get(
      `${API_URL}/posts/titlegen/${id}`,
      this.getHttpOptions()
    );
  }

  getLiveProductList() {
    return this.liveProductList;
  }

  getPendingProductList() {
    return this.pendingProductList;
  }

  getProductInfo(id: number) {
    return this.http.get(`${API_URL}/posts/${id}`, this.getHttpOptions());
  }

  async getEditingStatus(id: number) {
    let token = localStorage.getItem('loginToken');
    let res = await lastValueFrom(
      this.http.get(`${API_URL}/posts/${id}`, this.getHttpOptions())
    );
    return res[0].status == 'editing';
  }

  getProductList() {
    return this.productList;
  }

  async getGenTags(id: number) {
    let token = localStorage.getItem('loginToken');
    let res = await lastValueFrom(
      this.http.get(`${API_URL}/posts/taggen/${id}`, this.getHttpOptions())
    );
    return res['gen_tags'];
  }

  async getGenCategories(id: number) {
    let token = localStorage.getItem('loginToken');
    let res = await lastValueFrom(
      this.http.get(`${API_URL}/posts/catgen/${id}`, this.getHttpOptions())
    );
    return res['cats_dict'];
  }

  async updateAllLiveProductList() {
    this.liveProductList = [];
    let token = localStorage.getItem('loginToken');
    let res2: any = await lastValueFrom(
      this.http.get(
        `${API_URL}/posts/live/${this.liveTab}`,
        this.getHttpOptions()
      )
    );
    console.log(this.getHttpOptions());
    console.log(this.liveTab);
    console.log('live products');
    console.log(res2);
    if (res2) {
      this.createAndStoreProductList(this.liveProductList, res2);
    }
  }

  async updateAllPendingProductList() {
    this.pendingProductList = [];
    let token = localStorage.getItem('loginToken');
    console.log(this.getHttpOptions());
    let res3: any = await lastValueFrom(
      this.http.get(
        `${API_URL}/posts/pending/${this.pendingTab}`,
        this.getHttpOptions()
      )
    );
    console.log(this.pendingTab);
    console.log('pending products');
    console.log(res3);
    this.createAndStoreProductList(this.pendingProductList, res3);
    console.log(this.pendingProductList);
  }

  async updateAllProductList() {
    console.log('getToken');
    console.log(localStorage.getItem('loginToken'));
    this.productList = [];
    this.pendingProductList = [];
    this.liveProductList = [];
    let token = localStorage.getItem('loginToken');
    let res1: any = await lastValueFrom(
      this.http.get(`${API_URL}/allpostsjson`, this.getHttpOptions())
    );
    console.log('all products');
    console.log(res1);
    console.log(this.productList);
    this.createAndStoreProductList(this.productList, res1);
    console.log(this.productList);
    console.log(this.liveTab);
    let res2: any = await lastValueFrom(
      this.http.get(
        `${API_URL}/posts/live/${this.liveTab}`,
        this.getHttpOptions()
      )
    );
    // console.log('live products');
    console.log(res2);
    if (res2) {
      this.createAndStoreProductList(this.liveProductList, res2);
    }
    // console.log(this.liveProductList);
    let res3: any = await lastValueFrom(
      this.http.get(
        `${API_URL}/posts/pending/${this.pendingTab}`,
        this.getHttpOptions()
      )
    );
    // console.log('pending products');
    // console.log(res3);
    this.createAndStoreProductList(this.pendingProductList, res3);
    console.log(this.pendingProductList);
  }

  private createAndStoreProductList(list: Product[], res: any) {
    // console.log(list);
    // console.log(res);
    for (let i = 0; i < res.length; i++) {
      try {
        // console.log(res[i]);
        let temp = new Product(
          res[i].id,
          res[i].sp_id,
          res[i].pid,
          res[i].status,
          res[i].gen_title,
          res[i].selected_title ? JSON.parse(res[i].selected_title) : undefined,
          res[i].title,
          res[i].gen_categories,
          res[i].categories ? JSON.parse(res[i].categories) : undefined,
          res[i].gen_start_date,
          res[i].start_date,
          res[i].gen_end_date,
          res[i].end_date,
          res[i].gen_tags,
          res[i].tags ? JSON.parse(res[i].tags) : undefined,
          res[i].gen_content,
          res[i].content,
          res[i].od_image,
          res[i].images ? res[i].ocr_image : undefined,
          res[i].score,
          res[i].created_at,
          res[i].updated_at,
          res[i].od_latency,
          res[i].ocr_latency,
          res[i].ner_date_latency,
          res[i].ner_categories_latency,
          res[i].ner_title_latency
        );
        if (res[i].images)
          temp.images = res[i].images
            .replace('{', '')
            .replace('}', '')
            .split(',', 1);
        list.push(temp);
      } catch (e) {
        continue;
      }
    }
  }

  createAndStoreProduct(res: any) {
    try {
      // console.log(res[i]);
      let temp = new Product(
        res.id,
        res.sp_id,
        res.pid,
        res.status,
        res.gen_title,
        res.selected_title ? JSON.parse(res.selected_title) : undefined,
        res.title,
        res.gen_categories,
        res.categories ? JSON.parse(res.categories) : undefined,
        res.gen_start_date,
        res.start_date,
        res.gen_end_date,
        res.end_date,
        res.gen_tags,
        res.tags ? JSON.parse(res.tags) : undefined,
        res.gen_content,
        res.content,
        res.od_image,
        res.images ? res.ocr_image : undefined,
        res.score,
        res.created_at,
        res.updated_at,
        res.od_latency,
        res.ocr_latency,
        res.ner_date_latency,
        res.ner_categories_latency,
        res.ner_title_latency
      );
      if (res.images)
        temp.images = res.images
          .replace('{', '')
          .replace('}', '')
          .split(',', 1);
      return temp;
    } catch (e) {
      console.log(e);
    }
    return new Product();
  }

  addPost(formData: FormData) {
    let token = localStorage.getItem('loginToken');
    return this.http.post(`${API_URL}/posts`, formData, this.getHttpOptions());
  }

  addNewAccount(formData: FormData) {
    return this.http.post(`${API_URL}/users`, formData);
  }

  login(formData: FormData) {
    return this.http.post(`${API_URL}/auth/login`, formData);
  }

  updatePost(product: Product): Observable<Product> {
    console.log(product);
    console.log('update');
    console.log(product.selectedTitle);
    console.log(JSON.stringify(product.selectedTitle));
    var formData = new FormData();
    if (product.sp_id) formData.append('sp_id', product.sp_id.toString());
    if (product.pid) formData.append('pid', product.pid.toString());
    if (product.status) formData.append('status', product.status);
    if (product.title) formData.append('title', product.title);
    if (product.genTitle)
      formData.append('gen_title', JSON.stringify(product.genTitle));
    if (product.selectedTitle)
      formData.append('selected_title', JSON.stringify(product.selectedTitle));
    if (product.categories)
      formData.append('categories', JSON.stringify(product.categories));
    if (product.genCategories)
      formData.append('gen_categories', JSON.stringify(product.genCategories));
    if (product.startDate)
      formData.append('start_date', product.startDate.toString());
    if (product.genStartDate)
      formData.append('gen_start_date', product.genStartDate.toString());
    if (product.endDate)
      formData.append('end_date', product.endDate.toString());
    if (product.genEndDate)
      formData.append('gen_end_date', product.genEndDate.toString());
    if (product.tags) formData.append('tags', JSON.stringify(product.tags));
    if (product.genTags)
      formData.append('gen_tags', JSON.stringify(product.genTags));
    if (product.content) formData.append('content', product.content);
    if (product.genContent) formData.append('gen_content', product.genContent);
    let token = localStorage.getItem('loginToken');
    console.log(this.getHttpOptions());
    return this.http.put<Product>(
      `${API_URL}/posts/${product.id}`,
      formData,
      this.getHttpOptions()
    );
  }

  deletePost(id: number): Observable<Product> {
    let token = localStorage.getItem('loginToken');
    return this.http.delete<Product>(
      `${API_URL}/posts/${id}`,
      this.getHttpOptions()
    );
  }

  datePost(product: Product) {
    let token = localStorage.getItem('loginToken');
    let cleanedcleanedText = product.content
      .replace(/[^ ]*weeks[^ ]*/, '')
      .replace(/[^ ]*days[^ ]*/, '')
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/[^ ]*now[^ ]*/, '')
      .replace(/[^ ]*today[^ ]*/, '')
      .replace(/[^ ]*available[^ ]*/, '');
    console.log(cleanedcleanedText);
    return this.http.post<any>(
      `${AI_URL}/getdates`,
      product.content,
      this.getHttpOptions()
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

// http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBIUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d64d370314689f266934d8600da6e615fb96f8e9/ESC_SDS%20Project%20UML%20Use%20Case%20Diagram%20-%20UML%20Class%20diagram.png
// http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBQUT09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--9d60f20cd4da41f957efa6c4b9cd1061b9be4f84/ESC_SDS%20Project%20UML%20Use%20Case%20Diagram%20-%20UML%20Class%20diagram.png
