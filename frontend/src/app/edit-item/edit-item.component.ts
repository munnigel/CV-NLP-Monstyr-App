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

  tagsGenerated: boolean = false;
  genTagsLoading: boolean = false;
  categoriesGenerated: boolean = false;
  genCategoriesLoading: boolean = false;
  zeroTagsGenerated: boolean = false;
  zeroCategoriesGenerated: boolean = false;

  endDate: any;
  genCategories: string[];

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tagCtrl = new FormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];
  categoryCtrl = new FormControl('');
  filteredCategories: Observable<string[]>;
  categories: string[] = [];
  allCategories: string[] = [
    'Electronics,  Devices, etc',
    'Beauty & Health',
    "Women's",
    "Men's",
    "Kids'",
    'Groceries,  etc',
    'Department  Stores',
    'Home,  Bath, etc',
    'Sports,  Travel, etc',
    'Arts, Hobbies, Toys, etc',
    'Jewellery,  Optical, etc',
    'Stationery, Gifts, etc',
    "Pets'",
    'Cars,  Bikes, etc',
    'Others  (Shop)',
    'Cafés, Drinks  & Desserts',
    'Restaurants & Eateries',
    'Food Court  & Stalls',
    'Baked Goods, Snacks, etc',
    'Alcohol, Bars & Clubs',
    'Food  Delivery',
    'Others  (Eat & Drink)',
    'Beauty &  Aesthetics',
    'Hair & Nails',
    'Massage & Spa',
    'Others  (Relax)',
    'Flights & Hotels',
    'Taxi, Rides  & Parking',
    'Credit Cards  & Fin Svcs',
    'Mobile,  Broadband, etc',
    'Repair & Cleaning',
    'Dental & Medical',
    'Petrol &  Auto Workshop',
    'Others (Travel & Svcs)',
    'Attractions',
    'Movies & Theatre',
    'Concerts,  Shows & Events',
    'Gaming & Arcade',
    'Others  (Play)',
  ];

  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasrv: DataService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) =>
        category ? this._filterCategories(category) : this.allCategories.slice()
      )
    );
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
        categories: [''],
        startDate: [''],
        endDate: [''],
        title: [''],
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
    console.log(this.filteredTags);
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

  async onProcessed() {
    console.log(this.categories);
    if (this.editForm.invalid) {
      this.error = true;
      this.errMsg = 'Please complete all required fields.';
    } else {
      this.pendingProduct.title = this.editForm.value.title;
      this.pendingProduct.categories = this.categories;
      this.pendingProduct.tags = this.tags;
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

  async makeTag() {
    this.allTags = [];
    this.tagsGenerated = false;
    this.genTagsLoading = true;
    this.allTags = await this.datasrv.getGenTags(this.pendingProduct.id);
    this.genTagsLoading = false;
    this.tagsGenerated = true;
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((tag: string | null) =>
        tag ? this._filterTags(tag) : this.allTags.slice()
      )
    );
    this.tagInput.nativeElement.click();
  }

  async makeCategory() {
    this.allCategories = [];
    this.categoriesGenerated = false;
    this.genCategoriesLoading = true;
    let temp = await this.datasrv.getGenCategories(this.pendingProduct.id);
    if (temp != null) {
      for (let i = 0; i < 5; i++) {
        this.categories.push(temp[i][0]);
      }
    }
    this.genCategoriesLoading = false;
    this.categoriesGenerated = true;
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
          next: () => { },
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
