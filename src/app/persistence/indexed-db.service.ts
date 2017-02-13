import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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
		let subject: Subject<Message> = new Subject<Message>();
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
			Observable.merge(this.getOutgoingMessages(), this.getIncomingMessages()).flatMap((messageList: Message[]) => Observable.from(messageList)).subscribe((message) => subject.next(message),(error) =>subject.error(error),() =>subject.complete());
		}
		request.onerror = (event) => alert('Could not initialize IndexedDB');
		return subject;
	}

	resetIncomingMessageStore(){
		let persistSubject: Subject<void> = new Subject<void>();
	   	let tx = this.db.transaction(OUTGOING_MESSAGES_KEY, 'readwrite');
		let store = tx.objectStore(OUTGOING_MESSAGES_KEY);
		store.clear();
		tx.oncomplete = () => {
			persistSubject.next();
			persistSubject.complete();
		};
		tx.onerror = (e) => {
			persistSubject.error(e);
			persistSubject.complete();
		};
		return persistSubject;
	}
	

    persistIncomingMessage(message: Message): Observable<void>{
		let persistSubject: Subject<void> = new Subject<void>();
	   	let tx = this.db.transaction(INCOMING_MESSAGES_KEY, 'readwrite');
		let store = tx.objectStore(INCOMING_MESSAGES_KEY);
		store.put(message);
		tx.oncomplete = () => {
			persistSubject.next();
			persistSubject.complete();
		};
		tx.onerror = (e) => {
			persistSubject.error(e);
			persistSubject.complete();
		};
		return persistSubject;
    }

	persistOutgoingMessage(message: Message): Observable<void>{
		let persistSubject: Subject<void> = new Subject<void>();
	   	let tx = this.db.transaction(OUTGOING_MESSAGES_KEY, 'readwrite');
		let store = tx.objectStore(OUTGOING_MESSAGES_KEY);
		store.put(message);
		tx.oncomplete = () => {
			persistSubject.next();
			persistSubject.complete();
		};
		tx.onerror = (e) => {
			persistSubject.error(e);
			persistSubject.complete();
		};
		return persistSubject;
    }

	getOutgoingMessages(recipient?):Observable<Message[]> {
		let subject: Subject<Message[]> = new Subject<Message[]>();
        let tx = this.db.transaction(OUTGOING_MESSAGES_KEY, 'readonly');
		let store = tx.objectStore(OUTGOING_MESSAGES_KEY);
		if(!recipient){
			store.getAll().onsuccess = (event) => subject.next(event.target.result);
			store.getAll().onerror = (e) => subject.error(e);
		}
		else {
			//TODO Add filter by recipient
		}
		tx.oncomplete = () => subject.complete();
		return subject;
    }

	getIncomingMessages(sender?):Observable<Message[]> {
		let subject: Subject<Message[]> = new Subject<Message[]>();
        let tx = this.db.transaction(INCOMING_MESSAGES_KEY, 'readonly');
		let store = tx.objectStore(INCOMING_MESSAGES_KEY);
		if(!sender){
			store.getAll().onsuccess = (event) => subject.next(event.target.result);
			store.getAll().onerror = (e) => subject.error(e);
		}
		else {
			//TODO Add filter by recipient
		}
		tx.oncomplete = () => subject.complete();
		return subject;
    }
}