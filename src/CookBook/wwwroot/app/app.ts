/// <reference path="../../node_modules/angular2-in-memory-web-api/typings/browser.d.ts" />

// Framework Imports
import {provide, Component} from '@angular/core';
import {CORE_DIRECTIVES} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {HTTP_BINDINGS, HTTP_PROVIDERS, Headers, RequestOptions, BaseRequestOptions} from '@angular/http';
import { RouteConfig, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ROUTER_BINDINGS } from '@angular/router-deprecated';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import {enableProdMode} from '@angular/core';
import 'rxjs/Rx'; 

// Custom Imports
import { Routes, APP_ROUTES } from './routes';
import { DataService } from './services/data';
import { UtilityService } from './services/utilityService';

@Component({
    selector: 'cookbook',
    templateUrl: './app/app.html',
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES]
})

@RouteConfig(APP_ROUTES)

export class AppRoot {

    private routes = Routes;
    private _router: Router;

    constructor(location: Location, public api: DataService, router: Router) {
        this.routes = Routes;
        this._router = router;
        location.go('/');
    }

    isUserAuthenticated(): boolean {
        var _user = localStorage.getItem('user');
        if (_user != null)
            return true;
        else
            return false;
    }

    logout(): void {
        this.api.post("../api/logout", null, false)
        .subscribe(res => {
            localStorage.removeItem('user');
        },
            error => console.error('Error: ' + error),
            () => { });
    }
}

class AppBaseRequestOptions extends BaseRequestOptions {
    headers: Headers = new Headers({
        'Content-Type': 'application/json'
    })
}

bootstrap(AppRoot, [HTTP_PROVIDERS, ROUTER_PROVIDERS,
    provide(RequestOptions, { useClass: AppBaseRequestOptions }),
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    UtilityService, DataService])
    .catch(err => console.error(err));