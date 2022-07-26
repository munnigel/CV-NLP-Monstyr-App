import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Product } from '../product.model';
import { ConfirmationDialogModel } from '../confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
// import { parse } from 'path';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  pendingProduct: Product;
  description = '';
  title = '';
  category = '';
  promotionDate = '';
  popup;
  editForm: FormGroup;
  error = false;
  errMsg: string;
  id: number;

  endDate: any;
  genCategories: string[];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = ['Tag1', 'Tag2', 'Tag3', 'Tag4', 'Tag5'];
  categoryCtrl = new FormControl('');
  filteredCategories: Observable<string[]>;
  categories: string[] = [];
  allCategories: string[] = ['Cat1', 'Cat2', 'Cat3', 'Cat4', 'Cat5'];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasrv: DataService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filterTags(tag) : this.allTags.slice()
      )
    );
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) =>
        category ? this._filterCategories(category) : this.allCategories.slice()
      )
    );
    this.genCategories = ['cat1', 'cat2', 'cat3', 'cat4'];
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      // console.log(this.datasrv.getPendingProductList()[id]);
      console.log(this.id);
      let pendingProductList = this.datasrv.getPendingProductList();
      for (let pendingProduct of pendingProductList) {
        // console.log(pendingProduct);
        if (pendingProduct.id == this.id) {
          this.pendingProduct = pendingProduct;
          break;
        }
      }
      console.log(this.pendingProduct);
      this.editForm = this.fb.group({
        categories: ['', Validators.required],
        startDate: [''],
        endDate: [''],
        title: ['', Validators.required],
        content: ['', Validators.required],
      });
    });

    // console.log(this.datasrv.getPendingProductList()[0]);
  }

  addTag(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.tags.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.tagCtrl.setValue(null);
  }

  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  selectedTag(event: MatAutocompleteSelectedEvent): void {
    this.tags.push(event.option.viewValue);
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
  }

  private _filterTags(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTags.filter((tag) =>
      tag.toLowerCase().includes(filterValue)
    );
  }

  addCategory(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.categories.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.categoryCtrl.setValue(null);
  }

  removeCategory(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selectedCategory(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.categoryInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
  }

  private _filterCategories(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter((category) =>
      category.toLowerCase().includes(filterValue)
    );
  }

  selectCat(i: number) {
    this.editForm.patchValue({ categories: this.genCategories[i] });
    console.log('set to');
    console.log(this.genCategories[i]);
  }

  async onProcessed() {
    if (this.editForm.invalid) {
      this.error = true;
      this.errMsg = 'Please complete all required fields.';
    } else {
      this.pendingProduct.title = this.editForm.value.title;
      this.pendingProduct.content = this.editForm.value.content;
      this.pendingProduct.categories = this.editForm.value.categories;
      this.pendingProduct.startDate = this.editForm.value.startDate;
      this.pendingProduct.endDate = this.editForm.value.endDate;
      this.pendingProduct.status = 'live';
      this.datasrv.updatePost(this.pendingProduct).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error('completed add', e),
        complete: () => {
          console.log('completed add');
          this.datasrv.updateAllProductList();
          this.router.navigate(['/home/processed']);
        },
      });
      setTimeout(() => {
        this.datasrv.updateAllProductList();
        this.router.navigate(['home/processed'], {});
      }, 2000);
    }
  }

  onPending() {
    this.router.navigate(['home/pending'], {});
  }

  makeDescription() {
    this.editForm.patchValue({ description: 'TAGS GENERATED WAAAA' });
    // this.description = 'DESCRIPTION GENERATED WAAAA';
    console.log('description activated');
  }
  makeTitle() {
    this.editForm.patchValue({ title: 'TITLE GENERATED WAAAA' });
    this.title = 'TITLE GENERATED WAAAA';
    console.log('title activated');
  }
  makeCategory() {
    this.editForm.patchValue({ category: 'CAT GENERATED WAAAA' });
    this.category = 'CATEGORY GENERATED WAAAA';
    console.log('category activated');
  }

  async getMinOrMaxDates(minOrMax: string) {
    let allDates;
    let datesList = [];
    this.datasrv.datePost(this.pendingProduct).subscribe({
      next: (r) => (allDates = r),
      complete: () => {
        console.log(allDates);
        for (const parsedObject of allDates) {
          console.log(parsedObject);
          if (parsedObject['start date'] != null) {
            datesList.push(new Date(parsedObject['start date']));
          }
          datesList.push(new Date(parsedObject['end date']));
        }

        var maxDate = new Date(Math.max.apply(null, datesList));
        var minDate = new Date(Math.min.apply(null, datesList));
        if (minOrMax == 'min') this.editForm.patchValue({ startDate: minDate });
        else if (minOrMax == 'max')
          this.editForm.patchValue({ endDate: maxDate });
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
          complete: async () => {
            console.log('post deleted');
            await this.datasrv.updateAllProductList();
            this.router.navigate(['/home/pending']);
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    });
  }
}
