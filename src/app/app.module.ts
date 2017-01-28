import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatboardComponent } from "./chatboard/chatboard.component";
import { ChatInputComponent } from "./chatboard/chat-input.component";

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { AppRoutes } from './routes/app-routes';

import { LocalStorageService } from './persistence/local-storage.service';
import { AuthenticationService } from './authentication/authentication.service';
import { SocketIOService } from './socket/socket-io.service';
import { AuthGuard } from './authentication/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatboardComponent,
    ChatInputComponent
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
    AuthenticationService,
    AuthGuard,
    SocketIOService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
