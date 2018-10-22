import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpEvent,
    HttpHandler, HttpErrorResponse, HttpResponseBase, HttpResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Check if logged in, if so set Authorization header.');

        const authToken = "auth-token";

        /* Clone the request and replace the original headers with
        cloned headers, updated with the authorization. */
        const authReq = request.clone({
            headers: request.headers.set('Authorization', `Bearer ${authToken}`)
        });

        return next.handle(authReq)
            .pipe(
                catchError((event: HttpEvent<any>) => this.handleAuthError(event))
            );
    }

    private handleAuthError(event: HttpEvent<any>) {
        // HttpResponse<T> extends HttpResponseBase
        /* type HttpEvent<T> = HttpSentEvent | HttpHeaderResponse
        | HttpResponse<T> | HttpProgressEvent | HttpUserEvent<T>; */
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof
        /* The instanceof operator tests whether the prototype property of a
        constructor appears anywhere in the prototype chain of an object. */
        if (event instanceof HttpErrorResponse ||
            event instanceof HttpResponseBase ||
            event instanceof HttpResponse) {
            if (event.status === 401 || event.status === 403) {
                // this.authservice.logout();
                console.log('Logout user');
            }
        }
        return throwError(event);
    }    
}