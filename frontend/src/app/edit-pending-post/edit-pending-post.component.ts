import { COMMA, ENTER, L, P } from '@angular/cdk/keycodes';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DataService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Product } from '../product.model';
import { ConfirmationDialogModel } from '../confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { fromEvent, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatInput } from '@angular/material/input';
import { minBy } from 'cypress/types/lodash';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-pending-post.component.html',
  styleUrls: ['./edit-pending-post.component.css'],
})
export class EditItemComponent implements OnInit {
  pendingProduct: Product;
  description = '';
  title = '';
  category = '';
  promotionDate = '';
  popup;
  editForm: UntypedFormGroup;
  error = false;
  errMsg: string;
  id: number;

  titlesGenerated: boolean = false;
  genTitlesLoading: boolean = false;
  tagsGenerated: boolean = false;
  genTagsLoading: boolean = false;
  categoriesGenerated: boolean = false;
  genCategoriesLoading: boolean = false;
  zeroTagsGenerated: boolean = false;
  zeroCategoriesGenerated: boolean = false;
  genStartDateLoading: boolean = false;
  startDateGenerated: boolean = false;
  genEndDateLoading: boolean = false;
  endDateGenerated: boolean = false;

  endDate: any;
  genCategories: string[];
  titleString: string = '';
  datePicker: UntypedFormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  titleCtrl = new UntypedFormControl('');
  filteredTitles: Observable<string[]>;
  titles: string[] = [];
  allTitles: string[] = [];
  tagCtrl = new UntypedFormControl('');
  filteredTags: Observable<string[]>;
  tags: string[] = [];
  allTags: string[] = [];
  categoryCtrl = new UntypedFormControl('');
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
  formats = [
    ['New!', '<Product Name>'],
    ['New Outlet!', '<Location>', '<Unit Number>'],
    ['X%', 'OFF', '<Product Name>'],
    ['Up to', 'X%', 'OFF', '<Product Name>'],
    ['X', '-for-', 'Y', '<Product Name>'],
    ['$', '<Amount>', 'for', '<Product Name>'],
    ['Free', '<Product Name>'],
  ];
  suggestions: string[][] = [];
  selectedFormat: number;
  finalTitle: string;
  titleProductName: string;
  titleLocation: string;
  titleXOFF: string;
  titleXForY: string;
  titleUnitNumber: string;
  titleAmount: string;

  @ViewChild('titleInput', { static: true })
  public titleInput: ElementRef<HTMLInputElement>;
  @ViewChild('tagInput') tagInput: ElementRef<HTMLInputElement>;
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('suggestionDropDown')
  suggestionDropDown: ElementRef<HTMLInputElement>;
  @ViewChild('titleProductName')
  titleProductNameElement: ElementRef<HTMLInputElement>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasrv: DataService,
    private router: Router,
    private fb: UntypedFormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.datePicker = new UntypedFormGroup({
      start: new UntypedFormControl(null),
      end: new UntypedFormControl(null),
    });
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe(
      startWith(null),
      map((category: string | null) =>
        category ? this._filterCategories(category) : this.allCategories.slice()
      )
    );
    this.filteredTitles = this.titleCtrl.valueChanges.pipe(
      startWith(null),
      map((title: string | null) =>
        title ? this._filterCategories(title) : this.allTitles.slice()
      )
    );
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      // console.log(this.datasrv.getPendingProductList()[id]);
      console.log(this.id);
      let pendingProductList = this.datasrv.getPendingProductList();
      if (!pendingProductList) {
        let output: any;
        this.datasrv.getProductInfo(this.id).subscribe({
          next: (res) => {
            output = res;
          },
          error: () => {
            console.log('error getting product');
          },
          complete: () => {
            this.pendingProduct = this.datasrv.createAndStoreProduct(output);
          },
        });
      } else
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

  selectSuggestion(i: number) {
    this.resetFields();
    this.selectedFormat = this.formats.indexOf(this.suggestions[i - 1]);
    if (this.selectedFormat == 0) {
      this.titleProductName = this.suggestions[i][1];
      console.log(this.suggestions[i]);
    } else if (this.selectedFormat == 1) {
      this.titleLocation = this.suggestions[i][1];
      this.titleUnitNumber = this.suggestions[i][2];
    } else if (this.selectedFormat == 2) {
      this.titleXOFF = this.suggestions[i][0];
      this.titleProductName = this.suggestions[i][1];
    } else if (this.selectedFormat == 3) {
      this.titleXOFF = this.suggestions[i][1];
      this.titleProductName = this.suggestions[i][2];
    } else if (this.selectedFormat == 4) {
      this.titleXForY = this.suggestions[i][0];
      this.titleProductName = this.suggestions[i][1];
    } else if (this.selectedFormat == 5) {
      console.log(this.suggestions[i]);
      this.titleAmount = this.suggestions[i][0];
      this.titleProductName = this.suggestions[i][2];
    } else if (this.selectedFormat == 6) {
      this.titleProductName = this.suggestions[i][1];
    }
    this.selectedFormat = this.formats.indexOf(this.suggestions[i - 1]);
    console.log(this.titleProductName);
    this.updateFinalString();
  }

  processSuggestions(res) {
    console.log('process suggestions');
    this.suggestions = [];
    let extracted = res.extractions;
    if (extracted.product_names != []) {
      if (extracted.moneyValues != []) {
        console.log(extracted);
        for (let name of extracted.product_names) {
          for (let moneyValue of extracted.moneyValues) {
            this.suggestions.push(this.formats[5]);
            this.suggestions.push([moneyValue, this.formats[5][2], name]);
          }
        }
      }
      if (extracted.xForYs != []) {
        for (let name of extracted.product_names) {
          for (let xForY of extracted.xForYs) {
            this.suggestions.push(this.formats[4]);
            this.suggestions.push([xForY, name]);
          }
        }
      }
      if (extracted.xPercentOffs != []) {
        for (let name of extracted.product_names) {
          for (let xPercentOff of extracted.xPercentOffs) {
            this.suggestions.push(this.formats[2]);
            this.suggestions.push([xPercentOff, name]);
          }
        }
        for (let name of extracted.product_names) {
          for (let xPercentOff of extracted.xPercentOffs) {
            this.suggestions.push(this.formats[3]);
            this.suggestions.push([this.formats[3][0], xPercentOff, name]);
          }
        }
      }
      for (let name of extracted.product_names) {
        this.suggestions.push(this.formats[0]);
        this.suggestions.push([this.formats[0][0], name]);
        this.suggestions.push(this.formats[6]);
        this.suggestions.push([this.formats[6][0], name]);
      }
    }
    if (extracted.outlet_names != []) {
      if (extracted.unitNumbers == [])
        for (let outlet of extracted.outlet_names) {
          this.suggestions.push(this.formats[1].splice(-1));
          this.suggestions.push([this.formats[1][0], outlet]);
        }
      else {
        for (let outlet of extracted.outlet_names) {
          for (let unitNumber of extracted.unitNumbers) {
            this.suggestions.push(this.formats[1]);
            this.suggestions.push([this.formats[1][0], outlet, unitNumber]);
          }
        }
      }
    }
  }

  addTitle(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.titles.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.titleCtrl.setValue(null);
  }

  removeTitle(title: string): void {
    const index = this.titles.indexOf(title);

    if (index >= 0) {
      this.titles.splice(index, 1);
    }
  }

  selectedTitle(event): void {
    this.titles.push(event.option.viewValue);
    this.titleInput.nativeElement.value = '';
    this.titleCtrl.setValue(null);
  }

  private _filterTitles(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allTitles.filter((title) =>
      title.toLowerCase().includes(filterValue)
    );
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
      this.pendingProduct.title = this.finalTitle;
      this.pendingProduct.categories = this.categories;
      this.pendingProduct.tags = this.tags;
      this.pendingProduct.startDate = this.datePicker.get('start').value;
      this.pendingProduct.endDate = this.datePicker.get('end').value;
      this.pendingProduct.status = 'live';
      this.datasrv.updatePost(this.pendingProduct).subscribe({
        next: (v) => console.log(v),
        error: (err) => {
          console.log(err);
          if (err.error.errors == 'Nil JSON web token') {
            console.log('need login');
            this.router.navigate(['/']);
          }
        },
        complete: async () => {
          console.log('completed add');
          try {
            await this.datasrv.updateAllProductList();
          } catch (err: any) {
            if (err.error.errors == 'Nil JSON web token') {
              console.log('need login');
              this.router.navigate(['/']);
            }
            return;
          }
          this.router.navigate(['/home/processed']);
        },
      });
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
    this.titlesGenerated = false;
    this.genTitlesLoading = true;
    // this.editForm.patchValue({ title: 'TITLE GENERATED WAAAA' });
    // this.title = 'TITLE GENERATED WAAAA';
    console.log('title activated');
    let output: any;
    let result: any;
    this.datasrv.makeTitle(this.pendingProduct.id).subscribe({
      next: (res) => {
        console.log('new title');
        console.log(res);
        output = res['extractions'];
        result = res;
      },
      error: () => {},
      complete: () => {
        for (let key in output) {
          // console.log(output[key]);
          if (output[key].length != 0) {
            this.titles.push(output[key]);
          }
        }
        // console.log(this.titles);
        this.titlesGenerated = true;
        this.genTitlesLoading = false;
        this.processSuggestions(result);
        console.log(this.suggestions);
        this.suggestionDropDown.nativeElement.click();
      },
    });
  }

  async makeTag() {
    this.allTags = [];
    this.tagsGenerated = false;
    this.genTagsLoading = true;
    try {
      this.allTags = await this.datasrv.getGenTags(this.pendingProduct.id);
    } catch (err: any) {
      if (err.error.errors == 'Nil JSON web token') {
        console.log('need login');
        this.router.navigate(['/']);
      }
      return;
    }
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
    let temp;
    try {
      temp = await this.datasrv.getGenCategories(this.pendingProduct.id);
    } catch (err: any) {
      if (err.error.errors == 'Nil JSON web token') {
        console.log('need login');
        this.router.navigate(['/']);
      }
      return;
    }

    if (temp != null) {
      for (let i = 0; i < 5; i++) {
        this.categories.push(temp[i][0]);
      }
    }
    this.genCategoriesLoading = false;
    this.categoriesGenerated = true;
  }

  async getMinOrMaxDates(minOrMax: string) {
    if (minOrMax == 'min') {
      this.genStartDateLoading = true;
      this.startDateGenerated = false;
    } else if (minOrMax == 'max') {
      this.genEndDateLoading = true;
      this.endDateGenerated = false;
    }
    let allDates;
    let datesList = [];
    this.datasrv.datePost(this.pendingProduct).subscribe({
      next: (r) => (allDates = r),
      error: (err) => {
        if (err.error.errors == 'Nil JSON web token') {
          console.log('need login');
          this.router.navigate(['/']);
        }
      },
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
        console.log(minDate);
        console.log(maxDate);
        if (minOrMax == 'min') {
          this.genStartDateLoading = false;
          this.startDateGenerated = true;
          this.datePicker.patchValue({ start: minDate });
        } else if (minOrMax == 'max') {
          this.genEndDateLoading = false;
          this.endDateGenerated = true;
          this.datePicker.patchValue({ end: maxDate });
        }
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
            await this.datasrv.updateAllProductList();
            this.router.navigate(['/home/pending']);
          },
        });
      }
    });
  }
}
