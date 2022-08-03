import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DataService } from './data-service.service';
import { EditItemComponent } from './edit-pending-post/edit-pending-post.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { PendingPostPageComponent } from './pending-post/pending-post.component';
import { ProcessedPostPageComponent } from './live-post/processed-post.component';
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
import { EditProcessedPostComponent } from './edit-live-post/edit-live-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { AddNewAccountComponent } from './add-new-account/add-new-account.component';
import { CookieService } from 'ngx-cookie-service';

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
    AddNewAccountComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [FileUploadService, CookieService, DataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
