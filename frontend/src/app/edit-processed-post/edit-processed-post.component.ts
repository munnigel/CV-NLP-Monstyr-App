import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Product } from '../product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeveloperToolsPageComponent } from '../developer-tools-page/developer-tools-page.component';
import { ConfirmationDialogModel } from '../confirmation-dialog/confirmation-dialog';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

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
    private fb: FormBuilder,
    private dialog: MatDialog
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
        title: [`${this.product.title}`, Validators.required],
        content: [`${this.product.content}`, Validators.required],
        categories: [`${this.product.categories}`, Validators.required],
        startDate: [`${this.product.startDate}`, Validators.required],
        endDate: [`${this.product.endDate}`, Validators.required],
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
      this.product.title = this.editForm.value.title;
      this.product.content = this.editForm.value.content;
      this.product.categories = this.editForm.value.categories;
      this.product.startDate = this.editForm.value.startDate;
      this.product.endDate = this.editForm.value.endDate;
      console.log(this.editForm.value.startDate);
      console.log(this.product);
      this.datasrv.updatePost(this.product).subscribe({
        next: (v) => console.log(v),
        error: (e) => console.error(e),
        complete: () => {
          this.datasrv.updateAllProductList();
          this.router.navigate(['home/processed'], {});
        },
      });
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
