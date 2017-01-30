import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { SendMessageAction } from '../effects/message-effects';
import { Contact, Message, Chats } from '../models';

@Component({
    selector: 'chat-flow',
    templateUrl: './chat-flow.component.html'
})
export class ChatFlowComponent {

	@Input() user:string;

	public messages$: Observable<Message> = Observable.combineLatest(this.appStateStore.select('chats'),
	this.appStateStore.select('selectedContact'),(chats:Chats[],selectedContact:Contact) => selectedContact&&chats[selectedContact.username]?chats[selectedContact.username]:[]
	);

    constructor(private appStateStore:Store<any>) {
    }
}
