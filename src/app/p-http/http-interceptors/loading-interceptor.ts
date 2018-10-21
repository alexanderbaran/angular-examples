import { finalize } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import {
    HttpInterceptor, HttpRequest, HttpEvent, HttpHandler
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

    constructor() {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Loading start');
        return next.handle(request)
            .pipe(
                finalize(() => {
                    console.log('Loading end');
                })
            );
    }
}