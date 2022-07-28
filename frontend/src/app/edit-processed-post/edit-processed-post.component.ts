import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DeveloperToolsPageComponent } from '../developer-tools-page/developer-tools-page.component';
import { ConfirmationDialogModel } from '../confirmation-dialog/confirmation-dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-edit-processed-post',
  templateUrl: './edit-processed-post.component.html',
  styleUrls: ['./edit-processed-post.component.css'],
})
export class EditProcessedPostComponent implements OnInit {
  product: Product;
  editForm: FormGroup;
  error = false;
  errMsg: string;
  id: number;
  titleCtrl = new FormControl('');
  descriptionCtrl = new FormControl('');

  separatorKeysCodes: number[] = [ENTER, COMMA];
  tags: string[] = [];
  categories: string[] = [];
  addOnBlur = true;

  datePicker: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasrv: DataService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.datePicker = new FormGroup({
      start: new FormControl(null),
      end: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
      // console.log(this.datasrv.getPendingProductList()[id]);
      let productList = this.datasrv.getLiveProductList();
      for (let product of productList) {
        if (product.id == this.id) {
          this.product = product;
          break;
        }
      }
      console.log(this.product);
      this.editForm = this.fb.group({
        title: [`${this.product.title}`, Validators.required],
        content: [`${this.product.content}`, Validators.required],
        startDate: [`${this.product.startDate}`, Validators.required],
        endDate: [`${this.product.endDate}`, Validators.required],
      });
    });
    if (this.product.title) this.titleCtrl.setValue(this.product.title);
    if (this.product.content)
      this.descriptionCtrl.setValue(this.product.content);
    if (this.product.tags) this.tags = this.product.tags;
    if (this.product.categories) this.categories = this.product.categories;
    if (this.product.startDate)
      this.datePicker.patchValue({ start: this.product.startDate });
    if (this.product.endDate)
      this.datePicker.patchValue({ end: this.product.endDate });
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
    if (this.editForm.invalid) {
      this.error = true;
      this.errMsg = 'Please complete all required fields.';
      setTimeout(() => {
        this.error = false;
        this.errMsg = undefined;
      }, 2000);
      return;
    } else {
      this.product.title = this.titleCtrl.value;
      this.product.content = this.descriptionCtrl.value;
      this.product.categories = this.categories;
      this.product.startDate = this.datePicker.get('start').value;
      this.product.endDate = this.datePicker.get('end').value;
      console.log(this.product);

      this.datasrv.updatePost(this.product).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          this.datasrv.updateAllProductList();
          this.router.navigate(['home/processed'], {});
        },
      });
      setTimeout(() => {
        this.datasrv.updateAllProductList();
        this.router.navigate(['home/processed'], {});
      }, 2000);
    }
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
            this.router.navigate(['/home/processed']);
          },
          error: (e) => {
            console.log(e);
          },
        });
      }
    });
  }
}
