import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-add-new-account',
  templateUrl: './add-new-account.component.html',
  styleUrls: ['./add-new-account.component.css'],
})
export class AddNewAccountComponent implements OnInit {
  selectedFile: File = null;
  postForm: UntypedFormGroup;
  url: any;
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private dataSrv: DataService
  ) {
    this.postForm = this.fb.group({
      name: [''],
      username: [''],
      email: [''],
      password: [''],
      account_type: [''],
    });
  }

  ngOnInit(): void {
    let regex = new RegExp('[a-z0-9]+@[mymail]+.[sutd]+.[edu]+.[sg]');
    this.postForm
      .get('email')
      .setValidators([Validators.required, Validators.pattern(regex)]);
    let regex2 = new RegExp('[a-z0-9]+@[monstyr]+.[com]');
    let testEmails = 'workingexample@mymail.sutd.edu.sg';
    let testEmails2 = 'notanemail.com';
    let testEmails3 = 'dsa@monstyr.com';
    console.log(regex.test(testEmails));
    console.log(regex2.test(testEmails2));
    console.log(regex2.test(testEmails3));
  }

  back() {
    this.router.navigate([''], {});
  }

  uploadFile(event: any) {
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      alert('Only images are supported.');
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
    };
    this.selectedFile = <File>event.target.files[0];
  }

  submitForm() {
    var formData: any = new FormData();
    let regex = new RegExp('[a-z0-9]+@[mymail]+.[sutd]+.[edu]+.[sg]');
    let regex2 = new RegExp('[a-z0-9]+@[monstyr]+.[com]');
    let regex3 = new RegExp('[a-z0-9]+@[gmail]+.[com]');
    if (
      this.postForm.get('email').value === '' ||
      (regex.test(this.postForm.get('email').value) === false &&
        regex2.test(this.postForm.get('email').value) === false &&
        regex3.test(this.postForm.get('email').value) === false)
    )
      alert(
        'Email is required, and email has to be either @mymail.sutd.edu.sg or @monstyr.com or @gmail.com'
      );
    else if (this.postForm.get('name').value === '') alert('Name is required');
    else if (this.postForm.get('username').value === '')
      alert('Username is required');
    else if (
      this.postForm.get('password').value === '' ||
      this.postForm.get('password').value.length < 6
    )
      alert('Password is required and has to be at least 6 characters long');
    else if (this.postForm.get('account_type').value === '')
      alert('Role is required');
    else {
      formData.append('name', this.postForm.get('name').value);
      formData.append('username', this.postForm.get('username').value);
      formData.append('email', this.postForm.get('email').value);
      formData.append('password', this.postForm.get('password').value);
      formData.append('account_type', this.postForm.get('account_type').value);
      if (this.selectedFile)
        formData.append(
          'profile_pic',
          this.selectedFile,
          this.selectedFile.name
        );

      this.dataSrv.addNewAccount(formData).subscribe({
        next: (res) => console.log(res),
        error: (err) => {
          console.log(err);
          alert(err.error.errors);
        },
        complete: () => {
          alert('Account added successfully');
          this.router.navigate([''], {});
        },
      });
    }
  }
}
