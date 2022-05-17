import {Component, OnDestroy, OnInit} from '@angular/core';

// need these import to make observables.
import {Observable, Subscription} from 'rxjs';
import {filter, map} from 'rxjs/operators';

// importing operator from rxjs


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
        if (count === 5) {
          observer.complete();
        }
        // error cancels the observable does NOT complete
        if (count > 3) {
          observer.error(new Error('count is greater than 3!'))
        }
        count++
      }, 1000)
    });
    // operators are important to modify data. below is a pipe method.
    // pipe takes a unlimited amount of arguments.
    // call map operator inside of pipe.
    // transforms data only after pipe.

    // customIntervalObservable.pipe(map((data: number) => {
    //   return 'round:' + (data + 1)
    // }))

    // operators allow to build chain of steps to funnel observable data through.


    // subscribing to custom observable, to subscribe pass a function that accepts emitted data
    // emiting data is the most common use case. 80% of the time first argument will be data your getting.
    this.firstObsSubscription = customIntervalObservable.pipe(filter(data => {
      // check true of false to continue on the observable chain
      return data > 0;
    }), map((data: number) => {
      return 'round:' + (data + 1)
    })).subscribe(data => {
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
