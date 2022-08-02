import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditItemComponent } from './edit-pending-post/edit-pending-post.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { PendingPostPageComponent } from './pending-post/pending-post.component';
import { ProcessedPostPageComponent } from './live-post/processed-post.component';
import { DeveloperToolsPageComponent } from './developer-tools-page/developer-tools-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { EditProcessedPostComponent } from './edit-live-post/edit-live-post.component';
import { AddPostComponent } from './add-post/add-post.component';

const routes: Routes = [
  { path: 'edit/:id', component: EditItemComponent },
  { path: 'login', component: LoginComponent },
  { path: 'editLive/:id', component: EditProcessedPostComponent },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewPageComponent },
      { path: 'pending', component: PendingPostPageComponent },
      { path: 'processed', component: ProcessedPostPageComponent },
      {
        path: 'developertools',
        component: DeveloperToolsPageComponent,
      },
      { path: 'addpost', component: AddPostComponent },
      { path: 'developertools/live/:id', redirectTo: 'developertools' },
      { path: 'developertools/pending/:id', redirectTo: 'developertools' },
      { path: 'settings', component: SettingsPageComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
