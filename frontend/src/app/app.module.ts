import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DataService } from './data-service.service';
import { EditItemComponent } from './edit-item/edit-item.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, HomePageComponent, EditItemComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [
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
