import { Component, OnInit } from '@angular/core';
import { ProgressBarMode } from '@angular/material/progress-bar';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data-service.service';
import { FileUploadService } from '../file-upload.service';
import { PendingProduct } from '../pending-product.model';
import { Product } from '../product.model';
import { Router, RouterEvent } from '@angular/router';

@Component({
  selector: 'app-developer-tools-page',
  templateUrl: './developer-tools-page.component.html',
  styleUrls: ['./developer-tools-page.component.css'],
})
export class DeveloperToolsPageComponent implements OnInit {
  tabIndex: number;
  onTopIndex: number;
  // Variable to store shortLink from api response
  shortLink: string = '';
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  tabSelector: string;
  tabSelectorList: string[];
  liveProductList: Product[];
  pendingProductList: PendingProduct[];

  pageTitle: string;
  pageTitleList: string[];
  mode: ProgressBarMode = 'determinate';
  value: number;

  trainedData: string;
  words: string[];

  OCRoutput: string[];
  NERoutput: string[];

  editing: boolean;
  currentSelector: string;

  constructor(
    private fileUploadService: FileUploadService,
    private dataSrv: DataService,
    private titleService: Title,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.pageTitleList = [
      'Select Post for Analysis',
      'Optical Character Recognition',
      'Object Detection',
      'Named Entity Recognition',
      'Keyword Extraction',
    ];
    this.tabSelectorList = [
      'selecting',
      'chooseLive',
      'choosePending',
      'chooseFile',
    ];

    let startTabIndex = 0;
    this.onTopIndex = startTabIndex;
    this.tabSelector = this.tabSelectorList[startTabIndex];
    this.pageTitle = this.pageTitleList[startTabIndex];
    this.value = (100 / 5) * (startTabIndex + 1);
    this.liveProductList = this.dataSrv.getLiveProductList();
    this.pendingProductList = this.dataSrv.getPendingProductList();
    this.trainedData = "this is jack's fav website";
    this.words = "this is jack's fav website".split(' ');
    this.titleService.setTitle('Dev-tools');
  }

  onTopClick(index: number) {
    this.onTopIndex = index;
    this.value = (100 / 5) * (index + 1);
    this.pageTitle = this.pageTitleList[index];
    if (index == 0) {
      this.tabSelector = this.tabSelectorList[0];
    }
  }

  onFunctionClick(index: number) {
    let titleList = ['Live Posts', 'Pending Posts', 'Manual Upload'];
    this.tabSelector = this.tabSelectorList[index + 1];
    this.currentSelector = titleList[index];
  }

  backToSelector() {
    this.tabSelector = this.tabSelectorList[0];
    this.editing = false;
  }

  onSelectLivePost(i: number) {
    let chosenProduct = this.liveProductList[i];
    this.dataSrv.setEditingStatus(true);
    this.dataSrv.getEditingStatus().subscribe((value) => {
      this.editing = value;
    });

    this.router.navigate([`home/developertools/edit-live/${chosenProduct.id}`]);
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
