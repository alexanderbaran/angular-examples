import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// https://www.jvandemo.com/a-10-minute-primer-to-javascript-modules-module-formats-module-loaders-and-module-bundlers/
// import * as Cropper from 'cropperjs/dist/cropper';
import Cropper from 'cropperjs';

// declare var Cropper: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('imageToCrop') imageToCrop: ElementRef;

    ngOnInit() {

        const cropper = new Cropper(this.imageToCrop.nativeElement, {
            aspectRatio: 16 / 9,
            checkCrossOrigin: false,
            crop: function(event) {
                console.log(event.detail.x);
                console.log(event.detail.y);
                console.log(event.detail.width);
                console.log(event.detail.height);
                console.log(event.detail.rotate);
                console.log(event.detail.scaleX);
                console.log(event.detail.scaleY);
            }
        });
        
    }

}