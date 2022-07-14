import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  constructor(private router: Router, private fb: FormBuilder, private dataSrv: DataService) {
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
      image: [null],
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
    var formData: any = new FormData();
    formData.append('sp_id', this.postForm.get('sp_id').value);
    formData.append('pid', this.postForm.get('pid').value);
    formData.append('status', this.postForm.get('status').value);
    formData.append('title', this.postForm.get('title').value);
    formData.append('genTitle', this.postForm.get('genTitle').value);
    formData.append('categories', this.postForm.get('categories').value);
    formData.append('genCategories', this.postForm.get('genCategories').value);
    formData.append('startDate', this.postForm.get('startDate').value);
    formData.append('genStartDate', this.postForm.get('genStartDate').value);
    formData.append('endDate', this.postForm.get('endDate').value);
    formData.append('genEndDate', this.postForm.get('genEndDate').value);
    formData.append('tags', this.postForm.get('tags').value);
    formData.append('genTags', this.postForm.get('genTags').value);
    formData.append('content', this.postForm.get('content').value);
    formData.append('genContent', this.postForm.get('genContent').value);
    formData.append('image', this.postForm.get('image').value);
    this.dataSrv.addPost(formData).subscribe({
      next: (r) => console.log(r),
      complete: () => {
        console.log('post added');
        this.router.navigate([`/home/overview`], {});
      },
      error: (e) => console.log(e),
    });
  }
}
