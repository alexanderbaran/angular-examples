import { Component, OnInit, OnDestroy } from '@angular/core';
import { of, Subscription, timer, interval, Subject, fromEvent } from 'rxjs';
import { map, take, takeUntil, delay, debounce, debounceTime } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
    // title = 'app';

    private $subscription: Subscription;
    private $until: Subject<boolean> = new Subject<boolean>();

    ngOnInit() {
        // console.log('test');

        // this.subscription = of(1, 2, 3)
        // this.subscription = timer(500)
        // this.subscription = timer(500, 200)
        // this.subscription = timer(0, 500)
        // this.$subscription = interval(500)
        this.$subscription = fromEvent(document, 'click')
            .pipe(
                // take(2),
                // map(
                //     (value: number) => {
                //         // return value * 2;
                //         return value;
                //     }
                // ),
                // take(2)
                // takeUntil(this.$until)
                // delay(500)
                // debounceTime(500)
                // debounce(() => timer(500))
            )
            .subscribe(
                // (value: number) => {
                //     console.log(value);
                // }
                () => console.log('clicked')
            );

        setTimeout(() => {
            this.$until.next(true);
        }, 2000);
    }

    ngOnDestroy() {
        this.$subscription.unsubscribe();
    }
}
