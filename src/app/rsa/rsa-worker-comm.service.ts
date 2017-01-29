import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { LocalStorageService } from '../persistence/local-storage.service';
const PRIVATE_RSA_KEY = 'private_rsa_key';
const PUBLIC_RSA_KEY = 'public_rsa_key';

@Injectable()
export class RsaWorkerCommService {

	constructor(private storage: LocalStorageService){

	}

    public getKeys(username:string): Observable<any>{
		const subject = new Subject<any>();
		const privateKey = this.storage.get(PRIVATE_RSA_KEY);
		const publicKey = this.storage.get(PUBLIC_RSA_KEY);
		if(privateKey && publicKey){
			return Observable.of({privateKey, publicKey});
		}
		let worker = new Worker('rsa-worker.js');
		worker.addEventListener('message', (e:any) => {
			this.storage.set(PRIVATE_RSA_KEY,e.data.privateKey);
			this.storage.set(PUBLIC_RSA_KEY, e.data.publicKey);
			subject.next(e.data);
			subject.complete();
		});
		
		worker.postMessage({type: 'generateKeys', payload: username});
		return subject;
	}

	/*generateKeys(username:string): Observable<GenerateKeys>{
		const subject = new Subject<GenerateKeys>();
		let worker = new Worker('rsa-worker.js');
		worker.addEventListener('generateKeys', (e:any) => {
			subject.next(e.data);
			subject.complete();
		});
		
		worker.postMessage({type: 'generateKeys', payload: username});
		return subject;
	}

	generateKeys(username:string): Observable<GenerateKeys>{
		const subject = new Subject<GenerateKeys>();
		let worker = new Worker('rsa-worker.js');
		worker.addEventListener('generateKeys', (e:any) => {
			subject.next(e.data);
			subject.complete();
		});
		
		worker.postMessage({type: 'generateKeys', payload: username});
		return subject;
	}*/
}