import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditItemComponent } from './edit-item/edit-item.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'edit/:id', component: EditItemComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
