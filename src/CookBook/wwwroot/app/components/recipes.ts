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
import { Step } from '../models/step';
import { Operation } from '../models/operation';
import { Ingredient } from '../models/ingredient';
import { UtilityService } from '../services/utilityService';

@Component({
    selector: 'recipes',
    providers: [DataService],
    templateUrl: './app/components/recipes.html', 
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, ROUTER_DIRECTIVES]
})
export class Recipes {
    private _recipes: Array<Recipe>;
    private _recipe: Recipe;
    private _steps: Array<Step>;
    private _step: string;
    private _ingredients: Array<Ingredient>;
    private _ingredient: string;
    private routes = Routes;
    private _router: Router;

    constructor(public http: Http, public api: DataService, router: Router, public utilityService: UtilityService) {
        this.routes = Routes;
        this._router = router;
        this.bind();
        this._recipe = new Recipe(0, '', '', null);
        this._recipes = [];
        this._ingredient = '';
        this._ingredients = [];
        this._step = '';
        this._steps = [];
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

    addIngredient(): void {
        this._ingredients.push(new Ingredient(this._ingredients.length, this._ingredient, '', null));
        this._ingredient = '';
    }

    removeIngredient(ingredient: Ingredient): void {
        this._ingredients = this._ingredients.filter(i => i.Id !== ingredient.Id && i.Title !== ingredient.Title);
    }

    addStep(): void {
        this._steps.push(new Step(this._steps.length, this._step, '', null));
        this._step = '';
    }

    removeStep(step: Step): void {
        this._steps = this._steps.filter(s => s.Id !== step.Id && s.Title !== step.Title);
    }

    submit(): void {

        var data = JSON.stringify({ Id: 0, Title: this._recipe.Title, Description: this._recipe.Description, Steps: this._steps, Ingredients: this._ingredients });
        var recipeResult: Operation = new Operation(false, '');

        this.api.post("../api/recipe", data)
            .subscribe(res => {
                recipeResult.Message = res.Message;
                recipeResult.Succeeded = res.Succeeded;
            },
            error => console.error('Error: ' + error),
            () => {
                if (recipeResult.Succeeded) {
                    this._router.navigate([this.routes.recipe.name, { id: recipeResult.Message }]);
                } else {
                    this.utilityService.navigateToSignIn();
                }
            }
         );
    }

    convertDateTime(date: Date) {
        return this.utilityService.convertDateTime(date);
    }
}