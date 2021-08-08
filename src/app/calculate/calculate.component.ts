import { Component, OnInit, HostBinding } from '@angular/core';
import { CountService } from '../count.service';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss'],
  animations: [
    trigger('normalReload', [
      state(
        'normal',
        style({
          transform: 'rotate(0)',
        })
      ),
      state(
        'reload',
        style({
          transform: 'rotate(359deg)',
        })
      ),
      transition('normal => reload', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class CalculateComponent implements OnInit {
  constructor(public countService: CountService) {}

  reload = false;

  toggle() {
    this.reload = !this.reload;
    this.countService.reset();
  }

  ngOnInit(): void {}
}
