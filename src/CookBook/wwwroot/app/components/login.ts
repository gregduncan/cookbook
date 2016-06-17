// Framework Imports
import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ROUTER_BINDINGS } from '@angular/router-deprecated';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Custom Imports
import { User } from '../models/user';
import { DataService } from '../services/data';
import { Routes, APP_ROUTES } from '../routes';
import { Operation } from '../models/operation';

@Component({
    selector: 'login',
    providers: [DataService],
    templateUrl: './app/components/login.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Login {

    private _user: User;
    private _isError: boolean;
    private _respMsg: string;
    private routes = Routes;
    private _router: Router;

    constructor(public http: Http, public api: DataService, router: Router) {
        this._user = new User('', '', '');
        this._isError = false;
        this._respMsg = '';
        this.routes = Routes;
        this._router = router;
    }

    submit(): void {

        var data = JSON.stringify(this._user);
        var loginResult: Operation = new Operation(false, '');

        this.api.post("../api/login", data)
            .subscribe(res => {
                loginResult.Message = res.Message;
                loginResult.Succeeded = res.Succeeded;
            },
            error => console.error('Error: ' + error),
            () => {
                if (loginResult.Succeeded) {
                    localStorage.setItem('user', JSON.stringify(this._user));
                    this._router.navigate([this.routes.recipes.name]);

                } else {
                    this._isError = true;
                    this._respMsg = loginResult.Message;
                }
            });
    };
}