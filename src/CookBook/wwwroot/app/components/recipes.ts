// Framework Imports
import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ROUTER_BINDINGS } from '@angular/router-deprecated';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Custom Imports
import { DataService } from '../services/data';
import { Routes, APP_ROUTES } from '../routes';
import { Recipe } from '../models/recipe';
import { UtilityService } from '../services/utilityService';

@Component({
    selector: 'recipes',
    providers: [DataService],
    templateUrl: './app/components/recipes.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Recipes {
    private _recipes: Array<Recipe>;
    private routes = Routes;
    private _router: Router;

    constructor(public http: Http, public api: DataService, router: Router, public utilityService: UtilityService) {
        this.routes = Routes;
        this._router = router;
        this.bind();
    }

    bind(): void {
        this.api.get("../api/recipe")
            .subscribe(res => {
                this._recipes = res.json();
            },
            error => {
                this.utilityService.navigateToSignIn();
            });
    };

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}