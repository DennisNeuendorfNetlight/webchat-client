import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { SocketIOService } from '../socket/socket-io.service';

@Component({
    selector: 'chat-input',
    templateUrl: './chat-input.component.html'
})
export class ChatInputComponent {

	@Input() user:string;

    constructor(private socket: SocketIOService) {
        this.chatInputForm = new FormGroup({
            message: new FormControl("", Validators.required),
        });
        this.send.subscribe((value:any) => {
            socket.send('chat', { name: this.user, text: value.message, timestamp: new Date() });       
        });
    }

    private send: Subject<any> = new Subject<any>();

    private chatInputForm: FormGroup;
}
