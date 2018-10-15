import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// import { AppRoutingModule } from './app-routing.module';
import { CropperJSModule } from './cropper-js/cropper-js.module';

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
        CropperJSModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
