import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data-service.service';
import { FileUploadService } from '../file-upload.service';
import { Product } from '../product.model';
import { Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { API_URL } from '../../app/env';

@Component({
  selector: 'app-developer-tools-page',
  templateUrl: './developer-tools-page.component.html',
  styleUrls: ['./developer-tools-page.component.css'],
})
export class DeveloperToolsPageComponent implements OnInit {
  // Tabs for developers to choose from live posts, pending posts or upload manually
  tabIndex: number;
  tabSelector: string;
  tabSelectorList: string[] = [
    'selecting',
    'chooseLive',
    'choosePending',
    'chooseFile',
  ];
  currentTabSelector: string;

  // Process tabs in dev-tools page (select post, OCR, OD, NER, keyword extraction)
  onTopIndex: number;

  // To check which stage is user currently at to prevent user
  // from accessing the subsequent parts without any post chosen
  invalidAction: boolean;
  // To store currently selected product
  currentSelectedProduct: Product;

  // To store currently parsed date
  currentParsedStartDate: string;
  currentParsedEndDate: string;

  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  liveProductList: Product[];
  pendingProductList: Product[];

  // For display at the top showing which part is user currently at
  pageTitle: string;
  pageTitleList: string[] = [
    'Select Post for Analysis',
    'Optical Character Recognition',
    'Object Detection',
    'Named Entity Recognition',
    'Keyword Extraction',
  ];

  // For progress bar
  barMode: ProgressBarMode = 'determinate';
  barValue: number;

  // For progress spinner
  spinnerMode: ProgressSpinnerMode = 'indeterminate';
  spinnerValue: number = 50;

  // To be used to store trained data from database
  trainedData: string;
  words: string[];
  OCRoutput: string[];
  NERoutput: string[];

  // To check if user is currently editing,
  // if yes redirect to show edit-item or edit-processed accordingly,
  // redirect back after finish editing
  liveEditing: boolean;
  pendingEditing: boolean;

  // Loading and waiting for trained data
  loadingTrainedData: boolean;

  imageForm: FormGroup;
  pipe: DatePipe;

  constructor(
    private fileUploadService: FileUploadService,
    private dataSrv: DataService,
    private titleService: Title,
    private router: Router,
    private location: Location,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.imageForm = this.fb.group({
      caption: [''],
      image: [null],
    });
  }

  ngOnInit(): void {
    let startTabIndex = 0;
    this.onTopIndex = startTabIndex;
    this.tabSelector = this.tabSelectorList[startTabIndex];
    this.pageTitle = this.pageTitleList[startTabIndex];

    // TODO: make progress bar dynamic according to which part of the page the user is at
    // set to 100 so the whole bar is filled
    // this.barValue = (100 / 5) * (startTabIndex + 1);

    this.barValue = 100;
    this.liveProductList = this.dataSrv.getLiveProductList();
    this.pendingProductList = this.dataSrv.getPendingProductList();
    this.trainedData = "Deteced.";
    this.words = this.trainedData.split(' ');
    this.titleService.setTitle('developer-tools');
  }

  reset() {
    this.liveEditing = false;
    this.pendingEditing = false;
  }

  onTopClick(index: number) {
    if (!this.currentSelectedProduct) {
      this.invalidAction = true;
      setTimeout(() => {
        this.invalidAction = false;
      }, 2000);
      return;
    }
    this.onTopIndex = index;
    // this.barValue = (100 / 5) * (index + 1);
    this.pageTitle = this.pageTitleList[index];
    this.currentTabSelector = undefined;
    this.reset();
    if (index == 0) {
      this.tabSelector = this.tabSelectorList[0];
    }
  }

  onFunctionClick(index: number) {
    let titleList = ['Live Posts', 'Pending Posts', 'Manual Upload'];
    this.tabSelector = this.tabSelectorList[index + 1];
    this.currentTabSelector = titleList[index];
  }

  manualCreatePost() {

  }

  backToSelector() {
    this.tabSelector = this.tabSelectorList[0];
    this.liveEditing = false;
    this.pendingEditing = false;
    this.router
      .navigateByUrl('/', {})
      .then(() => this.router.navigate(['home/developertools']));
  }

  backTo(currentTabSelector: string) {
    if (currentTabSelector.includes('live'))
      this.tabSelector = this.tabSelectorList[1];
    else if (currentTabSelector.includes('pending'))
      this.tabSelector = this.tabSelectorList[2];
    this.liveEditing = false;
    this.pendingEditing = false;
    this.currentSelectedProduct = undefined;
  }

  onSelectLivePost(i: number) {
    let chosenProduct = this.liveProductList[i];
    this.currentSelectedProduct = chosenProduct;
    this.location.replaceState(`home/developertools/live/${chosenProduct.id}`);
    // send product to backend for processing
    // receive and update currentSelectedProduct
    this.loadingTrainedData = true;
    setTimeout(() => {
      this.loadingTrainedData = false;
      this.onTopIndex = 1;
      if (this.currentSelectedProduct.startDate)
        this.currentParsedStartDate = this.pipe.transform(
          this.currentSelectedProduct.startDate,
          'dd/mm/yyyy'
        );
      else this.currentParsedStartDate = '-';
      if (this.currentSelectedProduct.endDate)
        this.currentParsedEndDate = this.pipe.transform(
          this.currentSelectedProduct.endDate,
          'dd/mm/yyyy'
        );
      else this.currentParsedEndDate = '-';
    }, 500);
  }

  onSelectPendingPost(i: number) {
    let chosenProduct = this.pendingProductList[i];
    this.currentSelectedProduct = chosenProduct;
    this.location.replaceState(
      `home/developertools/pending/${chosenProduct.id}`
    );
    this.loadingTrainedData = true;
    setTimeout(() => {
      this.loadingTrainedData = false;
      this.onTopIndex = 1;
    }, 500);
  }

  // updateEditStatus(editing: boolean) {
  //   CustomEvent
  //   console.log('switch back to page');
  // };

  uploadFile(event) {
    const file = event.target.files[0];
    this.imageForm.patchValue({
      image: file,
    });
    this.imageForm.get('image').updateValueAndValidity();
  }
  async submitForm() {
    var formData: any = new FormData();
    formData.append('image', this.imageForm.get('image').value);
    let res = await lastValueFrom(
      this.http.post(`${API_URL}/posts`, formData)
    );
    let temp = new Product();
    temp.images = res['images'];
    this.currentSelectedProduct = temp;
  }
}
