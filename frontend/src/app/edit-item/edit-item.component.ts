import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../product.model';
import { ConfirmationDialogModel } from '../confirmation-dialog/confirmation-dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { all } from 'cypress/types/bluebird';

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

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasrv: DataService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
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
        categories: [
          ``,
          Validators.required,
        ],
        startDate: [``, Validators.required],
        endDate: [``, Validators.required],
        title: [``, Validators.required],
        content: [``, Validators.required],
      });
    });

    // console.log(this.datasrv.getPendingProductList()[0]);
  }

  async onProcessed() {
    if (this.editForm.invalid) {
      this.error = true;
      this.errMsg = 'Please complete all required fields.';
      setTimeout(() => {
        this.error = false;
        this.errMsg = undefined;
      }, 2000);
      return;
    } else {
      this.pendingProduct.title = this.editForm.value.title;
      this.pendingProduct.content = this.editForm.value.description;
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

  getDates() {
    let allDates;
    let datesList = [];
    this.datasrv.datePost(this.pendingProduct).subscribe({
      next: (r) => (allDates = r),
      complete: () => {
        console.log(allDates);
        for (const parsedObject of allDates) {
          datesList.push(new Date(parsedObject["start date"]));
        }
      },
    }
    );

    console.log(new Date("2022-07-14T17:00:00.000+08:00"));
    console.log(datesList);

  }

  makeStartDate() {
    // this.editForm.patchValue({ promotionDate: 'DATE GENERATED WAAAA' });
    // this.promotionDate = '19/9/1999';
    // console.log('date activated');
    let temp;
    this.datasrv.datePost(this.pendingProduct).subscribe({
      next: (r) => (temp = r),
      complete: () => {
        console.log(temp);
        this.editForm.patchValue({ startDate: temp[0]['start date'] });
      },
    });
  }

  makeEndDate() {
    // this.editForm.patchValue({ promotionDate: 'DATE GENERATED WAAAA' });
    // this.promotionDate = '19/9/1999';
    // console.log('date activated');
    let temp;
    this.datasrv.datePost(this.pendingProduct).subscribe({
      next: (r) => (temp = r),
      complete: () => {
        console.log(temp);
        this.editForm.patchValue({ endDate: temp[0]['end date'] });
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
