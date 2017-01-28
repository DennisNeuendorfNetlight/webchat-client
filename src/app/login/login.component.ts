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
            auth.logIn(value.username).subscribe(
                success => {
                    if(success){
                        router.navigate(['chat']);
                        //console.log("loggedin");
                    }
            });             
        });
    }

    private login: Subject<{value:any, event:any}> = new Subject<{value:boolean,event:any}>();

    private loginForm: FormGroup;
}
