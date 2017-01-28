import { Injectable } from "@angular/core";

export interface LocalStorageServiceInterface {
    set(cname:string, cvalue: string);
    get(cname: string): string;
    remove(cname: string): void;
}

@Injectable()
export class LocalStorageService implements LocalStorageServiceInterface {

    private localStorage = localStorage;

    set(cname:string, cvalue: string){
       localStorage.setItem(cname, cvalue);
    }

    get(cname: string): string {
        return localStorage.getItem(cname);
    }

    remove(cname: string): void {
        localStorage.removeItem(cname);
    }
}