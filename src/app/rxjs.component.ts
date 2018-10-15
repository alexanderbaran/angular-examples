import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Subscription, timer, interval, Subject, fromEvent, forkJoin } from 'rxjs';
import { map, take, takeUntil, delay, debounce, debounceTime, mergeMap, flatMap, switchMap, distinctUntilChanged, tap } from 'rxjs/operators';

const myPromise = (val: string) => {
    return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(`Promise Resolved: ${val}`);
            }, 5000);
        }
    );
}

@Component({
    selector: 'rxjs',
    template: `RxJSComponent loaded`
    // templateUrl: './rxjs.component.html',
    // styleUrls: ['./rxjs.component.scss']
})
export class RxJSComponent implements OnInit, OnDestroy {
    constructor() { }

    private $subscription: Subscription;
    private $until: Subject<boolean> = new Subject<boolean>();

    ngOnInit() {

        this.$subscription = forkJoin(
                //emit 'Hello' immediately
                of('Hello'),
                //emit 'World' after 1 second
                of('World').pipe(delay(1000)),
                //emit 0 after 1 second
                interval(1000).pipe(take(1)),
                //emit 0...1 in 1 second interval
                interval(1000).pipe(take(2)),
                //promise that resolves to 'Promise Resolved' after 5 seconds
                myPromise('RESULT')            
            )
            .pipe(
                tap(val => console.log('tap() is the old do(), it does not transform'))
            )
            .subscribe(val => console.log(val));

        // // this.subscription = of(1, 2, 3)
        // // this.subscription = timer(500)
        // // this.subscription = timer(500, 200)
        // // this.subscription = timer(0, 500)
        // // this.$subscription = interval(500)
        // this.$subscription = fromEvent(document, 'click')
        //     .pipe(
        //         // take(2),
        //         // map(
        //         //     (value: number) => {
        //         //         // return value * 2;
        //         //         return value;
        //         //     }
        //         // ),
        //         // take(2)
        //         // takeUntil(this.$until)
        //         // delay(500)
        //         // debounceTime(500)
        //         // debounce(() => timer(500))
        //         /* flatMap and mergeMap is the same, flatMap is alias vice versa.*/
        //         // flatMap(
        //         // mergeMap(
        //         /* switchMap cancels the inner observable if the outer
        //         is emitting new value, while mergeMap merges and does not
        //         cancel. switchMap makes more sense when using http for
        //         example. */
        //         switchMap(
        //             (event: Event) => {
        //                 return timer(800)
        //                     .pipe(
        //                         map((value: number) => {
        //                             console.log('from inner');
        //                         })
        //                     );
        //             }
        //         )
        //     )
        //     .subscribe(
        //         // (value: number) => {
        //         //     console.log(value);
        //         // }
        //         () => console.log('clicked')
        //     );

        setTimeout(() => {
            this.$until.next(true);
        }, 2000);
    }

    ngOnDestroy() {
        this.$subscription.unsubscribe();
    }
}