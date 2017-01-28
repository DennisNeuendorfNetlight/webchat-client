import { Component } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
    selector: 'chatboard',
    templateUrl: './chatboard.component.html'
})
export class ChatboardComponent {

    constructor(private auth: AuthenticationService) {}

}
