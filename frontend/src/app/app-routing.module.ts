import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditItemComponent } from './edit-pending-post/edit-pending-post.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { OverviewPageComponent } from './overview-page/overview-page.component';
import { PendingPostPageComponent } from './pending-post/pending-post.component';
import { LivePostPageComponent } from './live-post/live-post.component';
import { EditProcessedPostComponent } from './edit-live-post/edit-live-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { AddNewAccountComponent } from './add-new-account/add-new-account.component';

const routes: Routes = [
  { path: 'edit/:id', component: EditItemComponent },
  { path: 'login', component: LoginComponent },
  { path: 'add', component: AddNewAccountComponent },
  { path: 'editLive/:id', component: EditProcessedPostComponent },
  {
    path: 'home',
    component: HomePageComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewPageComponent },
      { path: 'pending', component: PendingPostPageComponent },
      { path: 'processed', component: LivePostPageComponent },
      { path: 'addpost', component: AddPostComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
