import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http.service';

import { Observable } from 'rxjs';

@Injectable()
export class HttpServiceTestService {

    constructor(private httpService: HttpService) {}

    public getDummyData(): Observable<Response> {
        const url = "./assets/data/users.json";
        return this.httpService.get(url, null);
    }
}