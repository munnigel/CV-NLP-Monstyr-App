import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { lastValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataSrv: DataService
  ) {
    this.postForm = this.fb.group({
      sp_id: [''],
      pid: [''],
      status: [''],
      title: [''],
      genTitle: [''],
      categories: [''],
      genCategories: [''],
      startDate: [''],
      genStartDate: [''],
      endDate: [''],
      genEndDate: [''],
      tags: [''],
      genTags: [''],
      content: [''],
      genContent: [''],
      image: [''],
    });
  }

  ngOnInit(): void {}

  uploadFile(event) {
    const file = event.target.files[0];
    this.postForm.patchValue({
      image: file,
    });
    this.postForm.get('image').updateValueAndValidity();
  }
  submitForm() {
    console.log(this.postForm);
    console.log(this.postForm.get('genTitle').value);
    var formData: any = new FormData();
    if (this.postForm.get('sp_id').value)
      formData.append('sp_id', this.postForm.get('sp_id').value);
    if (this.postForm.get('pid').value)
      formData.append('pid', this.postForm.get('pid').value);
    if (this.postForm.status) formData.append('status', this.postForm.status);
    if (this.postForm.get('title').value)
      formData.append('title', this.postForm.get('title').value);
    if (this.postForm.get('getTitle').value)
      formData.append('gen_title', this.postForm.get('getTitle').value);
    if (this.postForm.get('categories').value)
      formData.append('categories', this.postForm.get('categories').value);
    if (this.postForm.get('genCategories').value)
      formData.append(
        'gen_categories',
        this.postForm.get('genCategories').value
      );
    if (this.postForm.get('startDate').value)
      formData.append('start_date', this.postForm.get('startDate').value);
    if (this.postForm.get('genStartDate'))
      formData.append('gen_start_date', this.postForm.get('genStartDate'));
    if (this.postForm.get('endDate'))
      formData.append('end_date', this.postForm.get('endDate'));
    if (this.postForm.get('genEndDate').value)
      formData.append('gen_end_date', this.postForm.get('genEndDate').value);
    if (this.postForm.get('tags').value)
      formData.append('tags', this.postForm.get('tags').value);
    if (this.postForm.get('genTags').value)
      formData.append('gen_tags', this.postForm.get('genTags').value);
    if (this.postForm.get('content').value)
      formData.append('content', this.postForm.get('content').value);
    if (this.postForm.get('genContent').value)
      formData.append('gen_content', this.postForm.get('genContent').value);
    this.dataSrv.addPost(formData).subscribe({
      next: (r) => console.log(r),
      complete: () => {
        this.dataSrv.updateAllProductList();
        console.log('post added');
        this.router.navigate([`/home/overview`], {});
      },
    });
  }
}
