// import { Subject } from 'rxjs/Subject';
import { Subject } from 'rxjs';

export class UsersService {
    // EventEmitter extends Subject
    /* The Angular2 team stressed the fact though, that EventEmitter should not be used for anything
    else then @Output()s in components and directives. Also EventEmitter gets cleaned up automatically
    unlike custom Subjects that you need to unsubscribe to in the onDestroy lifecycle hook. */
    // https://stackoverflow.com/questions/40238549/angular-2-event-emitters-vs-subject
    userActivated = new Subject();
}
