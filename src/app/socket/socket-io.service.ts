import { Injectable } from "@angular/core";
import * as socketIo from 'socket.io-client';

export interface LocalStorageServiceInterface {
    set(cname:string, cvalue: string);
    get(cname: string): string;
    remove(cname: string): void;
}

@Injectable()
export class SocketIOService{

    private socket: any;

	constructor() {
        this.socket = socketIo.connect('http://localhost:4000');
        this.socket.on('connect', () => { console.log("connected") });
    }

	send(channel:string, message:any){
		this.socket.emit(channel,message);
	}
}