import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from './user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  userActivated = false;
  // making subject a subscription to unsubscribe to prevent memory leaks.
  private activatedSub: Subscription;

  // injecting user service to listen to emitter.
  constructor(private userService: UserService) {
  }

  ngOnInit() {
    // listening to userservice.
    this.activatedSub = this.userService.activatedEmitter.subscribe(didActivate => {
      this.userActivated = didActivate;
    })
  }

  ngOnDestroy() {
    this.activatedSub.unsubscribe()
  }
}
