import { Component } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { Subject } from 'rxjs';

@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor(private auth: AuthenticationService) {
        this.loginForm = new FormGroup({
            username: new FormControl("", Validators.required),
        });
        this.login.subscribe(({value, event}) => {
            event.preventDefault();
            auth.logIn(value.username).subscribe(
                success => {
                    if(success){
                        //this.router.navigate([decodeURIComponent(this.redirectTo)],{queryParams:{}});
                        console.log("loggedin");
                    }
            });             
        });
    }

    private login: Subject<{value:any, event:any}> = new Subject<{value:boolean,event:any}>();

    private loginForm: FormGroup;

    title = "Horsy's - RainbowChat";
}
