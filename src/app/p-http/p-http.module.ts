import { NgModule } from '@angular/core';

// https://angular.io/api/http
// Deprecated in favor of @angular/common/http.
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { PHttpComponent } from './p-http.component';

import { HttpService } from './http.service';
import { HttpServiceTestService } from './http-service-test.service';
import { HttpClientTestService } from './http-client-test.service';


@NgModule({
    imports: [
        HttpModule,
        HttpClientModule
    ],
    declarations: [
        PHttpComponent
    ],
    exports: [
        PHttpComponent
    ],
    providers: [
        HttpService,
        HttpServiceTestService,
        HttpClientTestService
    ],
})
export class PHttpModuleModule { }