import { Route, Router } from '@angular/router-deprecated';
import { Home } from './components/home';
import { Register } from './components/register';

export var Routes = {
    home: new Route({ path: '/', name: 'Home', component: Home }),
    register: new Route({ path: '/register', name: 'Register', component: Register })
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);