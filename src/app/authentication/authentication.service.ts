import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { LocalStorageService } from '../persistence/local-storage.service';
import { Observable } from 'rxjs';
const USERNAME_KEY = 'username';

@Injectable()
export class AuthenticationService {

    constructor(private localStorageService: LocalStorageService) {

    }

    isLoggedIn(): boolean {
        return !!this.localStorageService.get(USERNAME_KEY);
    }

    getUsername(): string {
        return this.localStorageService.get(USERNAME_KEY);
    }

    logIn(username: string): Observable<boolean> {
        this.localStorageService.set(USERNAME_KEY, username);
        return Observable.of(true);
    }

    logOut(): Observable<boolean> {
        this.localStorageService.remove(USERNAME_KEY);
        return Observable.of(true);
    }
}