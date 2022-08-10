import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DataService } from '../data-service.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
})
export class SettingsPageComponent implements OnInit {
  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private dataSrv: DataService
  ) {}
  settingForm: FormGroup;
  ngOnInit(): void {
    this.titleService.setTitle('Settings');
    this.settingForm = this.fb.group({
      name: [this.dataSrv.getCurrentUser().name],
      role: [this.dataSrv.getCurrentUser().account_type],
      email: [this.dataSrv.getCurrentUser().email],
    });
  }
}
