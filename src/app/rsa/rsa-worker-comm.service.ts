import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../persistence/local-storage.service';
import { Message } from '../models';
const PUBLIC_RSA_KEY = 'public_rsa_key';

@Injectable()
export class RsaWorkerCommService {

	private worker: Worker = new Worker('rsa-worker.js');

    public getKeys(username:string): Observable<any>{
		const subject = new Subject<any>();
		const listener = (e:any) => {
			subject.next(e.data);
			subject.complete();
			this.worker.removeEventListener('message',listener);
		};
		this.worker.addEventListener('message', listener);
		
		this.worker.postMessage({type: 'generateKeys', payload: username});
		return subject;
	}

	public encrypt(message:Message, publicKey): Observable<Message>{
		const subject = new Subject<Message>();
		const listener = (e:any) => {
			subject.next(e.data);
			subject.complete();
			this.worker.removeEventListener('message',listener);
		};
		this.worker.addEventListener('message', listener);
		
		this.worker.postMessage({type: 'encrypt', payload: {message, publicKey}});
		
		return subject;
	}

	public decrypt(message:Message): Observable<Message>{
		const subject = new Subject<Message>();
		const listener = (e:any) => {
			subject.next(e.data);
			subject.complete();
			this.worker.removeEventListener('message',listener);
		};
		this.worker.addEventListener('message', listener);
		
		this.worker.postMessage({type: 'decrypt', payload: { message }});
		return subject;
	}
}