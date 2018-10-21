// http://stackoverflow.com/questions/34464108/angular2-set-headers-for-every-request/34465070#34465070

import { Injectable } from '@angular/core';
import {
    Http, RequestOptions, RequestOptionsArgs, Request,
    Response, Headers, RequestMethod
} from '@angular/http';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class HttpService {

    constructor(
        private http: Http,
        // private authservice: AuthService,
        // private loadingService: LoadingService
    ) { }

    get(url: string, options?: RequestOptionsArgs, loading: boolean = true): Observable<Response> {        
        const requestOptions = new RequestOptions({
            method: RequestMethod.Get,
            url: url            
        });
        const request = new Request(requestOptions);
        return this.request(request, options, loading);
    }

    post(url: string, body: any, options?: RequestOptionsArgs, loading: boolean = true): Observable<Response> {
        // RequestOptionsArgs is an interface type (deprecated).
        const requestOptionsArgs: RequestOptionsArgs = {
            method: RequestMethod.Post,
            url: url,
            body: body
        };
        // RequestOptions is a class type (deprecated).
        const requestOptions = new RequestOptions(requestOptionsArgs);
        // const requestOptions = new RequestOptions({
        //     method: RequestMethod.Post,
        //     url: url,
        //     body: body
        // });
        // Request is a class type (deprecated).
        const request = new Request(requestOptions);
        return this.request(request, options, loading);
    }

    request(url: string|Request, options?: RequestOptionsArgs, loading: boolean = true): Observable<Response> {

        if (loading) {
            // this.loadingService.start();
            console.log('Loading start.');
        }

        if (!options) {
            // options implements RequestOptionsArgs which is an interface.
            // https://angular.io/docs/ts/latest/api/http/index/RequestOptionsArgs-interface.html
            options = {};
        }
        if (!options.headers) {
            /* If options is not provided elsewhere then headers must be set with
            new Header(), or else updateHeaders() will fail because we will
            get error: EXCEPTION: Cannot read property 'set' of undefined. */
            options.headers = new Headers();
        }
        // this.updateHeaders(options.headers);
        // http://stackoverflow.com/questions/43877015/http-request-does-not-care-about-options-parameter-when-url-is-of-type-request-a
        // https://github.com/angular/angular/blob/master/packages/http/src/http.ts
        if (typeof url !== 'string' /*&& typeof url === 'object'*/) {
            this.updateHeaders(url.headers);
        } else {
            this.updateHeaders(options.headers);
        }

        const observable = this.http.request(url, options)
            .pipe(
                catchError((response: Response) => this.authError(response))
            );

        if (!loading) {
            return observable;
        } else {
            return observable
                .pipe(
                    finalize(() => {
                        // this.loadingService.done();
                        console.log('Loading done.');
                    })
                );
        }
    }

    // http://stackoverflow.com/questions/43870351/what-is-the-proper-way-of-catching-an-error-from-an-observable-in-angular-2/43870526#43870526
    private authError(response: Response) {
        if (response.status === 401 || response.status === 403) {
            // this.authservice.logout();
            console.log('Logout user');
        }
        return throwError(response);
    }

    private updateHeaders(headers: Headers) {
        headers.set('Content-Type', 'application/json');
        // if (this.authservice.isloggedIn()) {
        //     // https://angular.io/docs/ts/latest/api/http/index/Headers-class.html
        //     // See append vs set.
        //     headers.set('Authorization', `Bearer ${this.authservice.getToken()}`);
        // }
        console.log('Check if logged in, if so set Authorization header.');
    }
}