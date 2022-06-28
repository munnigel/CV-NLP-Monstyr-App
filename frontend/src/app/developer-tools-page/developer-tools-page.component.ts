import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data-service.service';
import { FileUploadService } from '../file-upload.service';
import { PendingProduct } from '../pending-product.model';
import { Product } from '../product.model';
import { Router, RouterEvent } from '@angular/router';
import { Location } from '@angular/common';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

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
  currentSelectedProduct: PendingProduct | Product;

  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  liveProductList: Product[];
  pendingProductList: PendingProduct[];

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

  constructor(
    private fileUploadService: FileUploadService,
    private dataSrv: DataService,
    private titleService: Title,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    let startTabIndex = 0;
    this.onTopIndex = startTabIndex;
    this.tabSelector = this.tabSelectorList[startTabIndex];
    this.pageTitle = this.pageTitleList[startTabIndex];
    this.barValue = (100 / 5) * (startTabIndex + 1);
    this.liveProductList = this.dataSrv.getLiveProductList();
    this.pendingProductList = this.dataSrv.getPendingProductList();
    this.trainedData = "this is jack's fav website";
    this.words = "this is jack's fav website".split(' ');
    this.titleService.setTitle('Dev-tools');
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
    this.barValue = (100 / 5) * (index + 1);
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

  backToSelector() {
    this.tabSelector = this.tabSelectorList[0];
    this.liveEditing = false;
    this.pendingEditing = false;
    this.router.navigate(['home/developertools']);
  }

  onSelectLivePost(i: number) {
    let chosenProduct = this.liveProductList[i];
    this.currentSelectedProduct = chosenProduct;
    this.location.replaceState(`home/developertools/live/${chosenProduct.id}`);
    this.loadingTrainedData = true;
    setTimeout(() => {
      this.loadingTrainedData = false;
      this.onTopIndex = 1;
    }, 3000);
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
    }, 3000);
  }

  // updateEditStatus(editing: boolean) {
  //   CustomEvent
  //   console.log('switch back to page');
  // };

  // On file Select
  onChange(event) {
    this.file = event.target.files[0];
  }

  // OnClick of button Upload
  onUpload() {
    this.loading = !this.loading;
    this.fileUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        // Short link via api response
        this.shortLink = event.link;
        this.loading = false; // Flag variable
      }
    });
  }
}
