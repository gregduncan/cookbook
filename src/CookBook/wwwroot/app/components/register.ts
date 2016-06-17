// Framework Imports
import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ROUTER_BINDINGS } from '@angular/router-deprecated';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Custom Imports
import { User } from '../models/user';
import { DataService } from '../services/data';
import { Routes, APP_ROUTES } from '../routes';
import { Operation } from '../models/operation';

@Component({
    selector: 'register',
    providers: [DataService],
    templateUrl: './app/components/register.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})

export class Register {

    private _newUser: User;
    private _isSent: boolean;
    private _isError: boolean;
    private _respMsg: string;
    private routes = Routes;

    constructor(public http: Http, public api: DataService) {
        this._newUser = new User('', '', '');
        this._isSent = false;
        this._isError = false;
        this._respMsg = '';
        this.routes = Routes;
    }

    submit(): void {

        var data = JSON.stringify(this._newUser);
        var registerResult: Operation = new Operation(false, '');

        this.api.post("../api/register", data)
            .subscribe(res => {
                registerResult.Message = res.Message;
                registerResult.Succeeded = res.Succeeded;
            },
            error => console.error('Error: ' + error),
            () => {
                if (registerResult.Succeeded) {
                    this._isSent = true;
                } else {
                    this._isError = true;
                    this._respMsg = registerResult.Message;
                }
            });
    };
}