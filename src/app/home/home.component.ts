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
        // complete stops observables when they meet requirements.
        if (count === 2) {
          observer.complete();
        }
        // error cancels the observable does NOT complete
        if (count > 3) {
          observer.error(new Error('count is greater than 3!'))
        }
        count++
      }, 1000)
    });
    // subscribing to custom observable, to subscribe pass a function that accepts emitted data
    // emiting data is the most common use case. 80% of the time first argument will be data your getting.
    this.firstObsSubscription = customIntervalObservable.subscribe(data => {
      console.log(data)
      // second function is for errors and takes the error as an argument.
    }, error => {
      console.log(error)
      alert(error.message);
      // third function is to react to completion of the observable
      // Do not need to unsubscribed if observable is completed
    }, () => {
      console.log('Completed.')
    })

  }

  ngOnDestroy(): void {
    // clearing the subscription when ever we leave the component.
    this.firstObsSubscription.unsubscribe();
  }


}
