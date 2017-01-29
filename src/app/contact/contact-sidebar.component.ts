import { Component, Output, EventEmitter, Input } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Contact } from '../models';
import { SelectContactAction, RemoveSelectedContactAction } from '../reducer/selected-contact-reducer';

@Component({
    selector: 'contact-sidebar',
    templateUrl: './contact-sidebar.component.html'
})
export class ContactSidebarComponent {

	public contacts$: Observable<Contact[]> = this.appStateStore.select('contacts');
	@Input() selectedContact: Contact;
	
	public selectContact: Subject<Contact>  = new Subject<Contact>();

    constructor(private appStateStore:Store<any>) {
		this.selectContact.subscribe((contact) => 
				!this.selectedContact ? appStateStore.dispatch(new SelectContactAction(contact)) : appStateStore.dispatch(new RemoveSelectedContactAction()))
	}

}
