import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
// event emitter to use inside user component.
// subject instead of event emitter.
// using subjects is the recommended way
export class UserService {
  activatedEmitter = new Subject<boolean>();
}
