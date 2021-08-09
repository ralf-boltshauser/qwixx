import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-throw',
  templateUrl: './throw.component.html',
  styleUrls: ['./throw.component.scss'],
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
export class ThrowComponent implements OnInit {
  constructor() {}

  public diceValues: Array<number> = [0, 0, 0, 0, 0, 0];

  public colors = ['white', 'white', 'red', 'yellow', 'green', 'blue'];

  diceRoll() {
    this.reload = !this.reload;
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.roll();
      }, Math.pow(i / 3, 2) * 100);
    }
  }

  roll() {
    for (let i = 0; i < this.diceValues.length; i++) {
      this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
    }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    if (!('ondevicemotion' in window)) {
      alert('Not Supported');
    }
    window.addEventListener('devicemotion', (event: any) => {
      var x = event.accelerationIncludingGravity.x;
      var y = event.accelerationIncludingGravity.y;
      var z = event.accelerationIncludingGravity.z;
      var r = Math.round(Math.sqrt(x * x + y * y + z * z) * 10);
      if (r > 0) {
        this.diceRoll();
      }
    });
  }

  reload = false;
}
