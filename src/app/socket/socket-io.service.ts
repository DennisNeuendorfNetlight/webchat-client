import { Injectable } from "@angular/core";
import * as socketIo from 'socket.io-client';
import { Store } from '@ngrx/store';
import { AddContactsAction } from '../reducer/contacts-reducer';
import { ReceiveMessageAction } from '../effects/message-effects';
import { Contact } from '../models';

@Injectable()
export class SocketIOService {

	private socket: any;
	private sessionId: string;
	private userdata: any;

	constructor(private appStateStore: Store<any>) {
		this.socket = socketIo.connect('http://localhost:4000');
		this.socket.on('session', (data) => {
			this.sessionId = data.sessionId;
			if (this.userdata && this.sessionId) {
				this.registerClient();
			}
		});
		this.socket.on('clients', (clients) => {
			if (clients && clients.length > 0){
				this.appStateStore.dispatch(new AddContactsAction(clients.filter((client) => this.userdata && client.username != this.userdata.username)));
			}
		});
		this.socket.on('chat', (message) => {
			this.appStateStore.dispatch(new ReceiveMessageAction(message))
		});		
	}

	public setUserdata(userdata) {
		this.userdata = userdata;
		if (this.userdata && this.sessionId) {
			this.registerClient();
		}
	}

	registerClient() {
		this.socket.emit('register', { username: this.userdata.username, publicKey: this.userdata.publicKey, sessionId: this.sessionId });
	}

	send(channel: string, message: any) {
		this.socket.emit(channel, message);
	}
}