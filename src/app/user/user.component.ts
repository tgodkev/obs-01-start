import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  id: number;
  onActive

  constructor(private route: ActivatedRoute, private userService: UserService) {
  }

  ngOnInit() {
    // params is an observable. you subscribe to observables to be notified of changing data.
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
    });
  }

  onActivate() {
    // use next instead of emit for subjects.
    this.userService.activatedEmitter.next(true);
  }
}
