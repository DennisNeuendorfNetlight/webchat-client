import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { LocalStorageService } from '../persistence/local-storage.service';
import { Message } from '../models';
const PUBLIC_RSA_KEY = 'public_rsa_key';

@Injectable()
export class RsaWorkerCommService {

	private worker: Worker = new Worker('rsa-worker.js');

    public getKeys(username:string): Observable<any>{
		return new Observable<Message>((observer: Observer<Message>) => {
			const listener = (e:any) => {
				observer.next(e.data);
				observer.complete();
				this.worker.removeEventListener('message',listener);
			};
			this.worker.addEventListener('message', listener);
			
			this.worker.postMessage({type: 'generateKeys', payload: username});
		});
	}

	public encrypt(message:Message, publicKey): Observable<Message>{
		return new Observable<Message>((observer: Observer<Message>) => {
			const listener = (e:any) => {
				observer.next(e.data);
				observer.complete();
				this.worker.removeEventListener('message',listener);
			};
			this.worker.addEventListener('message', listener);
			
			this.worker.postMessage({type: 'encrypt', payload: {message, publicKey}});

		});
	}

	public decrypt(message:Message): Observable<Message>{
		return new Observable<Message>((observer: Observer<Message>) => {
			const listener = (e:any) => {
				observer.next(e.data);
				observer.complete();
				this.worker.removeEventListener('message',listener);
			};
			this.worker.addEventListener('message', listener);
			
			this.worker.postMessage({type: 'decrypt', payload: { message }});
		});
	}
}