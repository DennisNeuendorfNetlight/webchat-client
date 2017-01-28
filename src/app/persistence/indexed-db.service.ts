import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
const OUTGOING_MESSAGES_KEY = 'OutgoingMessages';

@Injectable()
export class IndexedDbService {

	private db;

	private titleIndex;

	constructor(){
    	let indexedDB = window.indexedDB; // || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	}

	initializeDB(username:string): Observable<any> {
		var subject: Subject<any> = new Subject<any>();
		let request = indexedDB.open(username);
			
		request.onupgradeneeded = () => {
			// The database did not previously exist, so create object stores and indexes.
			let db = request.result;
			let outgoingStore = db.createObjectStore(OUTGOING_MESSAGES_KEY, {keyPath: "timestamp"});
			//let incomingStore = db.createObjectStore("IncomingMessages", {keyPath: "timestamp"});
			this.titleIndex = outgoingStore.createIndex('by_receiver', 'receiver', {unique: false});
			//var authorIndex = store.createIndex("by_author", "author");
		}
		request.onsuccess = () => {
			this.db = request.result;
			this.getOutgoingMessages().flatMap((messageList) => Observable.from(messageList)).subscribe((message) => subject.next(message),(error) =>subject.error(error),() =>subject.complete());
		}
		request.onerror = (event) => alert('Could not initialize IndexedDB');
		return subject;
	}
	

    persistOutgoingMessage(message: any): Observable<void>{
		var persistSubject: Subject<void> = new Subject<void>();
	   	var tx = this.db.transaction(OUTGOING_MESSAGES_KEY, 'readwrite');
		var store = tx.objectStore(OUTGOING_MESSAGES_KEY);
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

    getOutgoingMessages(recipient?):Observable<any> {
		var subject: Subject<any> = new Subject<any>();
        var tx = this.db.transaction(OUTGOING_MESSAGES_KEY, 'readonly');
		var store = tx.objectStore(OUTGOING_MESSAGES_KEY);
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
}