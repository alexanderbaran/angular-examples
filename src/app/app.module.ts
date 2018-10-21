import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
import { CropperJSModule } from './cropper-js/cropper-js.module';
import { PHttpModuleModule } from './p-http/p-http.module';

import { AppComponent } from './app.component';
import { RxJSComponent } from './rxjs.component';

@NgModule({
    declarations: [
        AppComponent,
        RxJSComponent
    ],
    imports: [
        BrowserModule,
        // AppRoutingModule
        CropperJSModule,
        PHttpModuleModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
