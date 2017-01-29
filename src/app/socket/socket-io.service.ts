import { Injectable } from "@angular/core";
import * as socketIo from 'socket.io-client';
import { Store } from '@ngrx/store';
import { Contact, AddContactAction } from '../reducer/contacts-reducer';

@Injectable()
export class SocketIOService{

    private socket: any;
	private sessionId: string;
	private username: string;

	constructor(private appStateStore: Store<any>) {
        this.socket = socketIo.connect('http://localhost:4000');
        this.socket.on('session', (data) => {
			this.sessionId = data.sessionId;
			if (this.username && this.sessionId){
				this.registerClient();
			}
		 });
		 this.socket.on('clients', (clients) => {
			console.log('clients', clients);
			if(clients && clients.length > 0)
				clients.filter((client) => client.username != this.username)
					.every((client) => this.appStateStore.dispatch(new AddContactAction(client)));
		 });
		 this.socket.on('chat', (message) => {
			console.log('chat', message);
		 });
    }

	setUsername(username){
		this.username = username;
		if (this.username && this.sessionId){
			this.registerClient();
		}
	}

	registerClient(){
		this.socket.emit('register',{username: this.username, sessionId: this.sessionId});
	}

	send(channel:string, message:any){
		this.socket.emit(channel,message);
	}
}