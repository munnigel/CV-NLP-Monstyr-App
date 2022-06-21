import { Component, OnInit } from '@angular/core';
import { DataService } from '../data-service.service';
import { PendingProduct } from '../pending-product.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css'],
})
export class EditItemComponent implements OnInit {
  // constructor(private datasrv: DataService) {}
  constructor(
    private activatedRoute: ActivatedRoute,
    private datasrv: DataService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      console.log(this.datasrv.getPendingProductList()[id]['score']);
    });

    // console.log(this.datasrv.getPendingProductList()[0]);
  }
}
