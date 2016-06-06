import { Route, Router } from '@angular/router-deprecated';
import { Home } from './components/home';
import { Register } from './components/register';
import { Login } from './components/login';

export var Routes = {
    home: new Route({ path: '/', name: 'Home', component: Home }),
    register: new Route({ path: '/register', name: 'Register', component: Register }),
    login: new Route({ path: '/login', name: 'Login', component: Login })
};

export const APP_ROUTES = Object.keys(Routes).map(r => Routes[r]);