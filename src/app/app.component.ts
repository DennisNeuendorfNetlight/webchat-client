import { Component } from '@angular/core';
import * as socketIo from 'socket.io-client';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {
    constructor() {
        let socket = socketIo.connect('http://localhost:4000');
        socket.on('connect', () => { console.log("connected") });
    }

    title = "Horsy's - WonderChat";
}
