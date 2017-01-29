import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatboardComponent } from './chatboard/chatboard.component';
import { ChatInputComponent } from './chatboard/chat-input.component';
import { ContactSidebarComponent } from './contact/contact-sidebar.component';

import { UsernamePipe } from './pipes/username-pipe';

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreLogMonitorModule, useLogMonitor } from '@ngrx/store-log-monitor';
import { AppRoutes } from './routes/app-routes';
import { reducer } from './reducer';
import { EffectsModule } from '@ngrx/effects';
import { MessageEffects } from './effects/message-effects';

import { LocalStorageService } from './persistence/local-storage.service';
import { IndexedDbService } from './persistence/indexed-db.service';
import { AuthenticationService } from './authentication/authentication.service';
import { SocketIOService } from './socket/socket-io.service';
import { AuthGuard } from './authentication/auth-guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatboardComponent,
    ChatInputComponent,
    ContactSidebarComponent,
    UsernamePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(AppRoutes),
    ReactiveFormsModule,
    StoreModule.provideStore(reducer),
    EffectsModule.run(MessageEffects),
    StoreDevtoolsModule.instrumentOnlyWithExtension({
      maxAge: 5
    })
  ],
  providers: [
    LocalStorageService,
    IndexedDbService,
    AuthenticationService,
    AuthGuard,
    SocketIOService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
