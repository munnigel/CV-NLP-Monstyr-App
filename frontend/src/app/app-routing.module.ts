import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditItemComponent } from './edit-item/edit-item.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { PendingPostPageComponent } from './pending-post-page/pending-post-page.component';
import { ProcessedPostPageComponent } from './processed-post-page/processed-post-page.component';
import { DeveloperToolsPageComponent } from './developer-tools-page/developer-tools-page.component';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { EditProcessedPostComponent } from './edit-processed-post/edit-processed-post.component';

const routes: Routes = [
  { path: 'edit/:id', component: EditItemComponent },
  { path: 'login', component: LoginComponent },
  { path: 'editLive/:id', component: EditProcessedPostComponent},
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewPageComponent },
      { path: 'pending', component: PendingPostPageComponent },
      { path: 'processed', component: ProcessedPostPageComponent },
      { path: 'developertools', component: DeveloperToolsPageComponent },
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
