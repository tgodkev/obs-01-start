import {Component, OnDestroy, OnInit} from '@angular/core';

// need these import to make observables.
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  // storing subscriptions to prevent memory leaks.

  private firstObsSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    // building observable.
    // interval is similar js set interval
    // not storing the observables interval, subscribe returns firstObs subscription.
    // this.firstObsSubscription = interval(1000).subscribe(count => {console.log(count) })

    // building real custom observable.
    const customIntervalObservable = Observable.create((observer) => {
      let count = 0;
      setInterval(() => {
        // next emits a new value.
        observer.next(count);
        count++
      }, 1000)
    });
    // subscribing to custom observable, to subscribe pass a function that accepts emitted data
    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data)
    })

  }

  ngOnDestroy(): void {
    // clearing the subscription when ever we leave the component.
    this.firstObsSubscription.unsubscribe();
  }


}
