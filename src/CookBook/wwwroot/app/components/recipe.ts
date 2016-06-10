// Framework Imports
import { Component } from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES} from '@angular/common';
import { RouteConfig, Router, RouterLink, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, ROUTER_BINDINGS, RouteParams } from '@angular/router-deprecated';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Custom Imports
import { DataService } from '../services/data';
import { Routes, APP_ROUTES } from '../routes';
import { Recipe as RecipeModel} from '../models/recipe';
import { Step } from '../models/step';
import { Ingredient } from '../models/ingredient.ts';
import { UtilityService } from '../services/utilityService';
@Component({
    selector: 'recipes',
    providers: [DataService],
    templateUrl: './app/components/recipe.html',
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Recipe {
    private routes = Routes;
    private _router: Router;
    private _routeParam: RouteParams;
    private _recipeId: string;
    private _title: string;
    private _description: string;
    private _createdOn: Date;
    private _steps: Array<Step>;
    private _ingredients: Array<Ingredient>;

    constructor(public http: Http, public api: DataService, router: Router, public utilityService: UtilityService, routeParam: RouteParams) {
        this.routes = Routes;
        this._router = router;
        this._routeParam = routeParam;
        this._recipeId = this._routeParam.get('id');
        this.bind();
    }

    bind(): void {
        this.api.get("../api/recipe/" + this._recipeId)
            .subscribe(res => {
                var data: any = res.json();
                console.log(data);
                this._title = data.Title;
                this._description = data.Description;
                this._ingredients = data.Ingredients;
                this._steps = data.Steps;
                this._createdOn = data.CreatedOn;
            },
            error => {
                this.utilityService.navigateToSignIn();
            });
    };

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}