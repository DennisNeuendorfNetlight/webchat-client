import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';
import { InitMessageStoreAction } from '../effects/message-effects';
import { Contact } from '../models';

@Component({
    selector: 'chatboard',
    templateUrl: './chatboard.component.html'
})
export class ChatboardComponent {

    public selectedContact$: Observable<Contact> = this.appStateStore.select('selectedContact');

    constructor(private appStateStore:Store<any>, private auth: AuthenticationService) {
		this.appStateStore.dispatch(new InitMessageStoreAction(auth.getUsername()));
	}
}
