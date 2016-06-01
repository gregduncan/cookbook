
import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';

import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Registration } from '../models/registration';

@Component({
    selector: 'register',
    templateUrl: './app/components/register.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES]
})
export class Register {

    private _newUser: Registration;

    constructor(public http: Http) {
        this._newUser = new Registration('', '', '');
    }

    submit(): void {
        var data = JSON.stringify(this._newUser);

        this.http.post("../api/register", data).toPromise()
            .then(console.log("test"))
            .catch(console.log("test"));  



            //.map(r => r.)
            //.subscribe(res => console.log(res), error => console.error("FAIL"), () => console.log("FINISHED"));
    };
}