import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DataService {

    constructor(public http: Http) {

    }

    get(uri: string) {
       return this.http.get(uri)
            .map(response => (<Response>response));
    }

    post(uri: string, data?: any, mapJson: boolean = true) {
        if (mapJson)
            return this.http.post(uri, data)
                .map(response => <any>(<Response>response).json());
        else
            return this.http.post(uri, data);
    }

    delete(uri: string, id: number) {
        return this.http.delete(uri + '/' + id.toString())
            .map(response => <any>(<Response>response).json())
    }

    deleteResource(resource: string) {
        return this.http.delete(resource)
            .map(response => <any>(<Response>response).json())
    }
}