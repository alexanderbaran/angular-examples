import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { User } from './User';


@Injectable()
export class HttpClientTestService {

    constructor(private httpClient: HttpClient) {}

    // public getDummyData(): Observable<User[]> {
    //     const url = "./assets/data/users.json";
    //     return this.httpClient.get<User[]>(url);
    // }

    getDummyData() {
        const url = "./assets/data/users.json";
        return this.httpClient.get(url);
    }

    /* Will not automatically extract the json body, but instead will give
    the whole response. */
    getDummyDataWithResponse() {
        const url = "./assets/data/users.json";
        // https://github.com/angular/angular/issues/18586
        /* When responseType is text then the body does not get converted
        to json automatically. Default is { observe: 'body', responseType: 'json' }, */
        return this.httpClient.get(url, { observe: 'response', responseType: 'text'});
    }    
}