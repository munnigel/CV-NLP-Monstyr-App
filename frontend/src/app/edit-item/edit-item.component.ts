import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { PendingProduct } from '../pending-product.model';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  pendingProductList: PendingProduct;
  description="";
  title='';
  category='';
  date='';
  popup;


  constructor(
    private activatedRoute: ActivatedRoute,
    private datasrv: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      // console.log(this.datasrv.getPendingProductList()[id]);
      this.pendingProductList = this.datasrv.getPendingProductList()[id]
      console.log(this.pendingProductList)
    });

    // console.log(this.datasrv.getPendingProductList()[0]);
  }

  onPending() {
    this.router.navigate(['home/pending'], {})
  }
  onProcessed() {
    this.router.navigate(['/home/processed'], {})
  }

  makeDescription() {
    this.description="DESCRIPTION GENERATED WAAAA"
  }
  makeTitle() {
    this.title="TITLE GENERATED WAAAA"
  }
  makeCategory() {
    this.category="CATEGORY GENERATED WAAAA"
  }
  makeDate() {
    this.date="19/9/1999"
  }
}
