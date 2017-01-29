import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { SendMessageAction } from '../effects/message-effects';
import { Contact } from '../models';

@Component({
    selector: 'chat-input',
    templateUrl: './chat-input.component.html'
})
export class ChatInputComponent {

	@Input() user:string;
	@Input() selectedContact: Contact;

    constructor(private appStateStore:Store<any>) {
        this.chatInputForm = new FormGroup({
            message: new FormControl("", Validators.required),
        });
        this.send.subscribe((value:any) => {
			const message = { sender: this.user, recipient: this.selectedContact.username, message: value.message, timestamp: new Date() }
            this.appStateStore.dispatch(new SendMessageAction(message));
        });
    }

    private send: Subject<any> = new Subject<any>();

    private chatInputForm: FormGroup;
}
