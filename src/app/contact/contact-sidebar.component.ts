import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
@Component({
    selector: 'contact-sidebar',
    templateUrl: './contact-sidebar.component.html'
})
export class ContactSidebarComponent {

	public contacts = this.appStateStore.select('contacts');

    constructor(private appStateStore:Store<any>) {}

}
