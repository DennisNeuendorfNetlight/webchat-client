import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { IndexedDbService } from '../persistence/indexed-db.service';
import { SocketIOService } from '../socket/socket-io.service';
import { RsaWorkerCommService } from '../rsa/rsa-worker-comm.service';
import { Message } from '../models';
import { AddSentMessageAction, AddReceivedMessageAction } from '../reducer/chats-reducer';
import { Action } from '@ngrx/store';

const SEND_MESSAGE = 'SEND_MESSAGE';

export class SendMessageAction implements Action {
    type:string = SEND_MESSAGE;
    constructor(public payload: Message){}
}

const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';

export class ReceiveMessageAction implements Action {
    type:string = RECEIVE_MESSAGE;
    constructor(public payload: Message){}
}

const INIT_MESSAGE_STORE = 'INIT_MESSAGE_STORE';

export class InitMessageStoreAction implements Action {
    type:string = INIT_MESSAGE_STORE;
	constructor(public payload: string){}
}

@Injectable()
export class MessageEffects {
  constructor(
    private http: Http,
    private actions$: Actions,
	private db: IndexedDbService,
	private socket: SocketIOService,
	private rsa: RsaWorkerCommService
  ) { }

	@Effect() send_message$ = this.actions$
		.ofType(SEND_MESSAGE)
		.map((action) => <Message>action.payload)
		.switchMap( (message) => this.db.persistOutgoingMessage(message)
			// If successful, dispatch success action with result
			.do(() => this.socket.send('chat', message))
			.map(res => (new AddSentMessageAction(message)))
			// If request fails, dispatch failed action
			.catch(() => Observable.of({ type: 'SEND_MESSAGE_FAILED' }))
		);

	@Effect() received_message$ = this.actions$
	.ofType(RECEIVE_MESSAGE)
	.map((action) => <Message>action.payload)
	.switchMap( (message) => this.db.persistIncomingMessage(message)
		// If successful, dispatch success action with result
		.map(res => (new AddReceivedMessageAction(message)))
		// If request fails, dispatch failed action
		.catch(() => Observable.of({ type: 'RECEIVE_MESSAGE_FAILED' }))
	);

	@Effect() init_message_store$ = this.actions$
      .ofType(INIT_MESSAGE_STORE)
	  .map((action) => <string>action.payload)
	  .switchMap( (username) => 
		  this.rsa.getKeys(username)
		  .map(keys => {	
			  return { username, publicKey: keys.publicKey};
			})
		  .do((userdata) => this.socket.setUserdata(userdata))
		  .flatMap(() => this.db.initializeDB(username))
			.map(message => {
				if(username===message.sender){
					return new AddSentMessageAction(message);
				}
				if(username===message.recipient){
					return new AddReceivedMessageAction(message);
				}
				else{
					return {type:"nothing"};
				}	
			})		
			// If request fails, dispatch failed action
			.catch(() => Observable.of({ type: 'INIT_MESSAGE_FAILED' }))
	  );
}