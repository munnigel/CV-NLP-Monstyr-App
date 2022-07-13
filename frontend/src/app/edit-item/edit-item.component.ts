import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { PendingProduct } from '../pending-product.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  pendingProduct: PendingProduct;
  description = '';
  title = '';
  category = '';
  promotionDate = '';
  popup;
  editForm: FormGroup;
  error = false;
  errMsg: string;
  id: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private datasrv: DataService,
    private router: Router,
    private fb: FormBuilder
  ) {}

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
        title: [`Auto generated title ${this.id}`, Validators.required],
        description: [
          `Auto generated description ${this.id}`,
          Validators.required,
        ],
        category: [`Auto generated category ${this.id}`, Validators.required],
        promotionDate: [`Auto generated date ${this.id}`, Validators.required],
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
      let editedData = await this.datasrv.getPendingProductList();
      (this.pendingProduct.title = this.editForm.value.title),
        (this.pendingProduct.description = this.editForm.value.description),
        (this.pendingProduct.category = this.editForm.value.category),
        (this.pendingProduct.promotionDate = this.editForm.value.promotionDate),
        // this.datasrv.updatePendingPost(this.pendingProduct).subscribe({
        //   next: (v) => console.log(v),
        //   error: (e) => console.error(e),
        //   complete: () => console.log('completed update'),
        // })

        this.datasrv.addLivePost(this.pendingProduct).subscribe({
          next: (v) => console.log(v),
          error: (e) => console.error('completed add', e),
          complete: () => console.log('completed add'),
        });

      this.datasrv.deletePendingPost(this.pendingProduct).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: async () => {
          await this.datasrv.updateLiveProductList();
          await this.datasrv.updatePendingProductList();
          this.router.navigate(['home/processed'], {});
        },
      });
    }
  }

  onPending() {
    this.router.navigate(['home/pending'], {});
  }

  makeDescription() {
    this.description = 'DESCRIPTION GENERATED WAAAA';
    console.log('description activated');
  }
  makeTitle() {
    this.title = 'TITLE GENERATED WAAAA';
    console.log('title activated');
  }
  makeCategory() {
    this.category = 'CATEGORY GENERATED WAAAA';
    console.log('category activated');
  }
  makeDate() {
    this.promotionDate = '19/9/1999';
    console.log('date activated');
  }
}
