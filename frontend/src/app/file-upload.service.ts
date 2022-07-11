import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from './env';

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {
  // API url
  baseApiUrl =
    'https://rubyduckies-rails-backend-wmma3ffcjq-as.a.run.app/photos';

  constructor(private http: HttpClient) {}

  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: localStorage.getItem('token'),
      Accept: 'application/json',
    }),
  };

  // Returns an observable
  upload(file): Observable<any> {
    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append('file', file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(`${this.baseApiUrl}`, formData);
  }
}
