import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';

import { HttpServiceTestService } from './http-service-test.service';
import { HttpClientTestService } from './http-client-test.service';

import { User } from './user';
import { HttpResponse } from 'selenium-webdriver/http';

@Component({
    selector: 'app-p-http',
    templateUrl: './p-http.component.html',
    styleUrls: ['./p-http.component.scss']
})
export class PHttpComponent implements OnInit {

    constructor(
        private httpServiceTestService: HttpServiceTestService,
        private httpClientTestService: HttpClientTestService
    ) {}

    ngOnInit() {
        // this.httpServiceTestService.getDummyData()
        //     .subscribe(
        //         (request: Response) => {
        //             // console.log(request);
        //             const body = request.json();
        //             // if (!body.success) {
        //             //     throw new Error('PHttpComponent ngOnInit() !body.success');
        //             // }
        //             console.log(body);
        //         }
        //     );

        // this.httpClientTestService.getDummyData()
        //     // subscribe((body: any) => {
        //     .subscribe((users: User[]) => {
        //         // users.forEach(
        //         //     (user: User) => {
        //         //         console.log(user);
        //         //     }
        //         // );

        //         for (let user of users) {
        //             console.log(user);
        //         }
        //     });

        this.httpClientTestService.getDummyDataWithResponse()
            .subscribe(
                (response: HttpResponse) => {
                    console.log(response);
                }
            );

    }

}
