import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeveloperToolsPageComponent } from '../developer-tools-page/developer-tools-page.component';

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
      let productList = this.datasrv.getLiveProductList();
      for (let product of productList) {
        if (product.id == this.id) {
          this.product = product;
          break;
        }
      }
      console.log(this.product);
      this.editForm = this.fb.group({
        title: [`${this.product['title']}`, Validators.required],
        description: [`${this.product['description']}`, Validators.required],
        category: [`${this.product['category']}`, Validators.required],
        date: [`${this.product['promotionDate']}`, Validators.required],
      });
    });
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
      let editedData = await this.datasrv.getLiveProductList();
      (this.product.title = this.editForm.value.title),
        (this.product.description = this.editForm.value.description),
        (this.product.category = this.editForm.value.category),
        (this.product.promotionDate = this.editForm.value.date),
        console.log(this.product);

      this.datasrv.updateLivePost(this.product).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => this.router.navigate(['home/processed'], {}),
      });
    }
  }
}
