import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Message } from '../models';

const OUTGOING_MESSAGES_KEY = 'OutgoingMessages';
const INCOMING_MESSAGES_KEY = 'IncomingMessages';

@Injectable()
export class IndexedDbService {

	private db;

	private titleIndex;

	constructor(){
    	let indexedDB = window.indexedDB; // || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	}

	initializeDB(username:string): Observable<Message> {
		return new Observable<Message>((observer: Observer<Message>) => {
			let request = indexedDB.open(username,3);
				
			request.onupgradeneeded = () => {
				// The database did not previously exist, so create object stores and indexes.
				let db = request.result;
				if(!db.objectStoreNames.contains(OUTGOING_MESSAGES_KEY)){
					let outgoingStore = db.createObjectStore(OUTGOING_MESSAGES_KEY, {keyPath: "timestamp"});
					this.titleIndex = outgoingStore.createIndex('by_recipient', 'recipient', {unique: false});
				}
				if(!db.objectStoreNames.contains(INCOMING_MESSAGES_KEY)){
					let incomingStore = db.createObjectStore(INCOMING_MESSAGES_KEY, {keyPath: "timestamp"});				
					this.titleIndex = incomingStore.createIndex('by_sender', 'sender', {unique: false});
				}
			}
			request.onsuccess = () => {
				this.db = request.result;
				Observable.merge(this.getOutgoingMessages(), this.getIncomingMessages()).flatMap((messageList: Message[]) => Observable.from(messageList))
					.subscribe((message) => observer.next(message),(error) =>observer.error(error),() => observer.complete());
			}
			request.onerror = (event) => alert('Could not initialize IndexedDB');
		});
	}

	persistMessage(message: Message, storekey: string): Observable<void>{
		return new Observable<void>((observer: Observer<void>) => {
			let tx = this.db.transaction(storekey, 'readwrite');
			let store = tx.objectStore(storekey);
			store.put(message);
			tx.oncomplete = () => {
				observer.next(null);
				observer.complete();
			};
			tx.onerror = (e) => {
				observer.error(e);
				observer.complete();
			};
		});
	}

    persistIncomingMessage(message: Message): Observable<void>{
		return this.persistMessage(message,INCOMING_MESSAGES_KEY);
    }

	persistOutgoingMessage(message: Message): Observable<void>{
		return this.persistMessage(message,OUTGOING_MESSAGES_KEY);
    }

	getMessages(storeKey:string, recipient?): Observable<Message[]> {
		return new Observable<Message[]>((observer: Observer<Message[]>) => {
			let tx = this.db.transaction(storeKey, 'readonly');
			let store = tx.objectStore(storeKey);
			store.getAll().onsuccess = (event) => observer.next(event.target.result);
			store.getAll().onerror = (e) => observer.error(e);
			tx.oncomplete = () => observer.complete();
		});
	}

	getOutgoingMessages(): Observable<Message[]> {
		return this.getMessages(OUTGOING_MESSAGES_KEY);
    }

	getIncomingMessages(sender?): Observable<Message[]> {
		return this.getMessages(INCOMING_MESSAGES_KEY);
    }
}