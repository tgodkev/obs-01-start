import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  id: number;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    // params is an observable. you subscribe to observables to be notified of changeing data.
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }
}
