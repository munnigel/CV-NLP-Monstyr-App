import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { lastValueFrom, map, Observable, startWith } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data-service.service';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { Product } from '../product.model';
import { allCategories } from '../env';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  selectedFile: File = null;
  postForm: UntypedFormGroup;
  datePicker: UntypedFormGroup;
  descriptionCtrl = new UntypedFormControl('');

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  categories: string[] = [];
  addOnBlur = true;

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
  status: string;
  filteredCategories: Observable<string[]>;
  allCategories = allCategories;
  categoryCtrl = new UntypedFormControl('');
  fileName: string;
  imageUrl;

  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private dataSrv: DataService
  ) {
    this.datePicker = new UntypedFormGroup({
      start: new UntypedFormControl(null),
      end: new UntypedFormControl(null),
    });
    this.postForm = this.fb.group({
      sp_id: [''],
      pid: [''],
      status: ['pending'],
      title: [''],
      genTitle: [''],
      categories: [''],
      genCategories: [''],
      startDate: [''],
      genStartDate: [''],
      endDate: [''],
      genEndDate: [''],
      tags: [''],
      genTags: [''],
      content: [''],
      genContent: [''],
      image: [''],
    });
  }
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  ngOnInit(): void {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) =>
        category ? this._filterCategories(category) : this.allCategories.slice()
      )
    );
  }

  onFileSelected(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      this.selectedFile = file;
      this.fileName = file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
      };
    }
  }

  private _filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter((category) =>
      category.toLowerCase().includes(filterValue)
    );
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

  selectedCategories(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  addCategories(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our category
    if (value) {
      if (value in allCategories) this.categories.push(value);
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

  submitForm() {
    let newProduct = new Product();
    newProduct.title = this.finalTitle;
    newProduct.selectedTitle = {
      productName: this.titleProductName,
      amount: this.titleAmount,
      XForY: this.titleXForY,
      XOFF: this.titleXOFF,
      unitNumber: this.titleUnitNumber,
      location: this.titleLocation,
      formatNumber: this.selectedFormat,
    };
    newProduct.content = this.descriptionCtrl.value;
    newProduct.categories = this.categories;
    newProduct.startDate = this.datePicker.get('start').value;
    newProduct.endDate = this.datePicker.get('end').value;
    newProduct.status = this.status;
    console.log(newProduct);

    this.dataSrv.addPost(newProduct, this.selectedFile).subscribe({
      next: (v) => console.log(v),
      error: (err) => {
        console.log(err);
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
}
