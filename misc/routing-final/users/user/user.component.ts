import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// import { Subscription } from 'rxjs/Subscription';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
    user: {id: number, name: string};
    paramsSubscription: Subscription;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        /* Fine to use snapshot for the first initialization,
        but for the subsequent changes we need a different approach. */
        this.user = {
            id: this.route.snapshot.params['id'],
            name: this.route.snapshot.params['name']
        };
        // For the subsequent changes.
        this.paramsSubscription = this.route.params
        .subscribe(
            (params: Params) => {
                this.user.id = params['id'];
                this.user.name = params['name'];
            }
        );
    }

    /* Don't have to do this, because Angular will do this for us regarding these route observables, 
    but if we add our own observables we need to do unsubscribe on our own. Does not hurt to do it
    manually here as well. */
    ngOnDestroy() {
        this.paramsSubscription.unsubscribe();
    }

}
