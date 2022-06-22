import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataService } from './data-service.service';
import { EditItemComponent } from './edit-item/edit-item.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { PendingPostPageComponent } from './pending-post-page/pending-post-page.component';
import { ProcessedPostPageComponent } from './processed-post-page/processed-post-page.component';
import { DeveloperToolsPageComponent } from './developer-tools-page/developer-tools-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { FileUploadService } from './file-upload.service';
import { EditProcessedPostComponent } from './edit-processed-post/edit-processed-post.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EditItemComponent,
    HomePageComponent,
    OverviewPageComponent,
    PendingPostPageComponent,
    ProcessedPostPageComponent,
    DeveloperToolsPageComponent,
    SettingsPageComponent,
    EditProcessedPostComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule, MatProgressBarModule, MatCardModule],

  providers: [
    FileUploadService,
    // DataService,
    {
      provide: APP_INITIALIZER,
      useFactory: initDataService,
      deps: [DataService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

export function initDataService(config: DataService) {
  return () => config.ngOnInit();
}
