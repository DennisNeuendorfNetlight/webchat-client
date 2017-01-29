import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthenticationService } from '../authentication/authentication.service';
import { InitMessageStoreAction } from '../effects/message-effects';

@Component({
    selector: 'chatboard',
    templateUrl: './chatboard.component.html'
})
export class ChatboardComponent {
    constructor(private appStateStore:Store<any>, private auth: AuthenticationService) {
		this.appStateStore.dispatch(new InitMessageStoreAction(auth.getUsername()));
	}
}
