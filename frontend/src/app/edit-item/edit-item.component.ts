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
        // title: [`${this.pendingProduct.genTitle}`, Validators.required],
        // content: [`${this.pendingProduct.genContent}`, Validators.required],
        // categories: [
        //   `${this.pendingProduct.genCategories}`,
        //   Validators.required,
        // ],
        // // startDate: [`${this.pendingProduct.genStartDate}`, Validators.required],
        // // endDate: [`${this.pendingProduct.genEndDate}`, Validators.required],
        // promotionDate: [`${this.pendingProduct.genEndDate}`, Validators.required],
        title: [`gfdfgd`, Validators.required],
        description: [`hhhh`, Validators.required],
        category: [`hello`, Validators.required],
        // startDate: [`${this.pendingProduct.genStartDate}`, Validators.required],
        // endDate: [`${this.pendingProduct.genEndDate}`, Validators.required],
        promotionDate: [`hi`, Validators.required],
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
      this.pendingProduct.categories = this.editForm.value.category;
      this.pendingProduct.startDate = this.editForm.value.promotionDate;
      this.pendingProduct.status = 'live';
      this.datasrv.updatePost(this.pendingProduct).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error('completed add', e),
        complete: () => console.log('completed add'),
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
  makeDate() {
    // this.editForm.patchValue({ promotionDate: 'DATE GENERATED WAAAA' });
    // this.promotionDate = '19/9/1999';
    // console.log('date activated');
    let temp;
    this.datasrv.datePost(this.pendingProduct).subscribe({
      next: (r) => temp = r, complete: () => {
        console.log(temp)
        this.editForm.patchValue({ promotionDate: temp[0]["end date"] });
      }
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
