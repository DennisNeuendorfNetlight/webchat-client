import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutes } from './routes/app-routes';

import { LocalStorageService } from './persistence/local-storage.service';
import { AuthenticationService } from './authentication/authentication.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule
  ],
  providers: [
    LocalStorageService,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
