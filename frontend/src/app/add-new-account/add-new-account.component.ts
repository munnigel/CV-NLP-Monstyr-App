import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-add-new-account',
  templateUrl: './add-new-account.component.html',
  styleUrls: ['./add-new-account.component.css']
})
export class AddNewAccountComponent implements OnInit {
  postForm: FormGroup;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dataSrv: DataService,
  ) {
    this.postForm = this.fb.group({
      name: [''],
      username: [''],
      email: [''],
      password: [''],
      role: [''],
    })
  }

  ngOnInit(): void {
  }

  back() {
    this.router.navigate([''], {})
  }

  submitForm() {

    var formData: any = new FormData();
    if (this.postForm.get('email').value === '')
      alert('Email is required');
    else if (this.postForm.get('name').value === '')
      alert('Name is required');
    else if (this.postForm.get('username').value === '')
      alert('Username is required');
    else if (this.postForm.get('password').value === '')
      alert('Password is required');
    else if (this.postForm.get('role').value === '')
      alert('Role is required');

    else {
      formData.append('name', this.postForm.get('name').value);
      formData.append('username', this.postForm.get('username').value);
      formData.append('email', this.postForm.get('email').value);
      formData.append('password', this.postForm.get('password').value);
      formData.append('role', this.postForm.get('role').value);
      alert('Account created successfully');
      console.log(this.postForm.get('role').value);
      this.router.navigate([''], {});
    }
  }
}
