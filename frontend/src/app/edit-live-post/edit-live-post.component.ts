import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmationDialogModel } from '../confirmation-dialog/confirmation-dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-edit-processed-post',
  templateUrl: './edit-live-post.component.html',
  styleUrls: ['./edit-live-post.component.css'],
})
export class EditProcessedPostComponent implements OnInit {
  product: Product;
  error = false;
  errMsg: string;
  id: number;
  descriptionCtrl = new UntypedFormControl('');

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  categories: string[] = [];
  addOnBlur = true;

  datePicker: UntypedFormGroup;

  formats = [
    ['New!', '<Product Name>'],
    ['New Outlet!', '<Location>', '<Unit Number>'],
    ['X%', 'OFF', '<Product Name>'],
    ['Up to', 'X%', 'OFF', '<Product Name>'],
    ['X', '-for-', 'Y', '<Product Name>'],
    ['$', '<Amount>', 'for', '<Product Name>'],
    ['Free', '<Product Name>'],
  ];
  selectedFormat: number;
  finalTitle: string;
  titleProductName: string;
  titleLocation: string;
  titleXOFF: string;
  titleXForY: string;
  titleUnitNumber: string;
  titleAmount: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasrv: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.datePicker = new UntypedFormGroup({
      start: new UntypedFormControl(null),
      end: new UntypedFormControl(null),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      let output: any;
      this.datasrv.getProductInfo(this.id).subscribe({
        next: (res) => {
          output = res;
        },
        error: () => {
          console.log('error getting product');
          this.router.navigate(['/']);
        },
        complete: () => {
          this.product = this.datasrv.createAndStoreProduct(output);
          this.updateAllFields();
          if (this.product.content)
            this.descriptionCtrl.setValue(this.product.content);
          if (this.product.tags) this.tags = this.product.tags;
          if (this.product.categories)
            this.categories = this.product.categories;
          if (this.product.startDate)
            this.datePicker.patchValue({ start: this.product.startDate });
          if (this.product.endDate)
            this.datePicker.patchValue({ end: this.product.endDate });
        },
      });
    });
  }

  setToPending() {
    let newProduct = new Product();
    newProduct.id = this.product.id;
    newProduct.status = 'pending';
    this.datasrv.updatePost(newProduct).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {},
      complete: () => {
        console.log('post set to pending');
        this.router.navigate(['/pending']);
      },
    });
  }

  updateAllFields() {
    console.log(this.product);
    if (this.product.selectedTitle['amount'])
      this.titleAmount = this.product.selectedTitle['amount'];
    if (this.product.selectedTitle['location'])
      this.titleLocation = this.product.selectedTitle['location'];
    if (this.product.selectedTitle['productName'])
      this.titleProductName = this.product.selectedTitle['productName'];
    if (this.product.selectedTitle['unitNumber'])
      this.titleUnitNumber = this.product.selectedTitle['unitNumber'];
    if (this.product.selectedTitle['XForY'])
      this.titleXForY = this.product.selectedTitle['XForY'];
    if (this.product.selectedTitle['XOFF'])
      this.titleXOFF = this.product.selectedTitle['XOFF'];
    if (this.product.selectedTitle['formatNumber'])
      this.selectedFormat = this.product.selectedTitle['formatNumber'];
    if (this.product.title) this.finalTitle = this.product.title;
  }

  updateProductName(event) {
    // console.log(event.target.value);
    this.titleProductName = event.target.value;
    this.updateFinalString();
  }

  updateAmount(event) {
    // console.log(event.target.value);
    this.titleAmount = event.target.value;
    this.updateFinalString();
  }

  updateXForY(event) {
    // console.log(event.target.value);
    this.titleXForY = event.target.value;
    this.updateFinalString();
  }

  updateXOFF(event) {
    // console.log(event.target.value);
    this.titleXOFF = event.target.value;
    this.updateFinalString();
  }

  updateUnitNumber(event) {
    // console.log(event.target.value);
    this.titleUnitNumber = event.target.value;
    this.updateFinalString();
  }

  updateLocation(event) {
    // console.log(event.target.value);
    this.titleLocation = event.target.value;
    this.updateFinalString();
  }

  selectFormat(i: number) {
    this.resetFields();
    this.selectedFormat = i;
    this.updateFinalString();
  }

  resetFields() {
    this.titleProductName = '';
    this.titleLocation = '';
    this.titleXOFF = '';
    this.titleXForY = '';
    this.titleUnitNumber = '';
    this.titleAmount = '';
  }

  updateFinalString() {
    if (this.selectedFormat == 0) {
      this.finalTitle = 'New! ' + this.titleProductName;
    } else if (this.selectedFormat == 1) {
      this.finalTitle =
        'New Outlet! ' + this.titleLocation + ', ' + this.titleUnitNumber;
    } else if (this.selectedFormat == 2) {
      this.finalTitle = this.titleXOFF + ' ' + this.titleProductName;
    } else if (this.selectedFormat == 3) {
      this.finalTitle = 'Up to ' + this.titleXOFF + ' ' + this.titleProductName;
    } else if (this.selectedFormat == 4) {
      this.finalTitle = this.titleXForY + ' ' + this.titleProductName;
    } else if (this.selectedFormat == 5) {
      this.finalTitle = this.titleAmount + ' for ' + this.titleProductName;
    } else if (this.selectedFormat == 6) {
      this.finalTitle = 'Free ' + this.titleProductName;
    }
  }

  addTags(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeTags(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  addCategories(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our category
    if (value) {
      this.categories.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeCategories(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  onLive() {
    this.router.navigate(['home/processed'], {});
  }

  async onSubmit() {
    this.product.title = this.finalTitle;
    this.product.selectedTitle = {
      productName: this.titleProductName,
      amount: this.titleAmount,
      XForY: this.titleXForY,
      XOFF: this.titleXOFF,
      unitNumber: this.titleUnitNumber,
      location: this.titleLocation,
      formatNumber: this.selectedFormat,
    };
    this.product.content = this.descriptionCtrl.value;
    this.product.categories = this.categories;
    this.product.startDate = this.datePicker.get('start').value;
    this.product.endDate = this.datePicker.get('end').value;
    console.log(this.product);

    this.datasrv.updatePost(this.product).subscribe({
      next: (v) => console.log(v),
      error: (err) => {
        if (err.error.errors == 'Nil JSON web token') {
          console.log('need login');
          this.router.navigate(['/']);
        }
      },
      complete: () => {
        this.router.navigate(['home/processed'], {});
      },
    });
  }
  deletePost(id: number) {
    const dialogData = new ConfirmationDialogModel('Delete this post?', '');
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      maxWidth: '400px',
      closeOnNavigation: true,
      data: dialogData,
    });
    dialogRef.afterClosed().subscribe(async (dialogResult) => {
      if (dialogResult) {
        this.datasrv.deletePost(id).subscribe({
          next: () => {},
          error: (err) => {
            if (err.error.errors == 'Nil JSON web token') {
              console.log('need login');
              this.router.navigate(['/']);
            }
          },
          complete: async () => {
            console.log('post deleted');
            this.router.navigate(['/home/processed']);
          },
        });
      }
    });
  }
}
