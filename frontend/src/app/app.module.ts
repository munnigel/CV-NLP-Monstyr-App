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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverviewDashboardComponent } from './overview-dashboard/overview-dashboard.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { NgChartsModule } from 'ng2-charts';
// import { CardComponent } from './card/card.component';
import { DashboardCardComponent } from './dashboard-card/dashboard-card.component';
import { LatencyBarComponent } from './chart/latency-bar/latency-bar.component';
import { AccuracyLineComponent } from './chart/accuracy-line/accuracy-line.component';
import { CompletionPieComponent } from './chart/completion-pie/completion-pie.component';
import { AcceptancePieComponent } from './chart/acceptance-pie/acceptance-pie.component';
import { EditProcessedPostComponent } from './edit-processed-post/edit-processed-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';

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
    OverviewDashboardComponent,
    // CardComponent,
    DashboardCardComponent,
    LatencyBarComponent,
    AccuracyLineComponent,
    CompletionPieComponent,
    AcceptancePieComponent,
    EditProcessedPostComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatProgressSpinnerModule,
    MatButtonToggleModule,
    MatDividerModule,
    MatDialogModule,
    MatProgressBarModule,
    NgChartsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatInputModule,
  ],
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
export class AppModule {}

export function initDataService(config: DataService) {
  return () => config.ngOnInit();
}
