import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../authentication/authentication.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

    constructor(private auth: AuthenticationService, router: Router) {
        this.loginForm = new FormGroup({
            username: new FormControl("", Validators.required),
        });
        this.login.subscribe(({value, event}) => {
            event.preventDefault();
            auth.logIn(value.username+'@'+this.generateUUID()).subscribe(
                success => {
                    if(success){
                        router.navigate(['chat']);
                        //console.log("loggedin");
                    }
            });             
        });
    }

    generateUUID = ():string => {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });
        return uuid;
    };

    private login: Subject<{value:any, event:any}> = new Subject<{value:boolean,event:any}>();

    private loginForm: FormGroup;
}
