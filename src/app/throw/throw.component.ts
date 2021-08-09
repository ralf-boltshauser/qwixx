import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import ShakeDetector from 'shake-detector';
import { DiceService } from '../services/dice.service';
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
  constructor(private diceService: DiceService) {}
  options = {
    threshold: 8,
    debounceDelay: 500,
  };
  shakeDetector = new ShakeDetector(this.options);
  canRoll = true;
  public diceValues: Array<number> = [0, 0, 0, 0, 0, 0];

  public colors = ['white', 'white', 'red', 'yellow', 'green', 'blue'];

  diceRoll() {
    if (this.canRoll) {
      this.canRoll = false;
      this.reload = !this.reload;
      for (let i = 0; i < 10; i++) {
        setTimeout(() => {
          this.roll();
          if (i == 9) {
            this.canRoll = true;
            this.diceService.setDices(this.diceValues);
          }
        }, Math.pow(i / 3, 2) * 100);
      }
    }
  }

  roll() {
    for (let i = 0; i < this.diceValues.length; i++) {
      this.diceValues[i] = Math.floor(Math.random() * 6) + 1;
    }
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.shakeDetector.confirmPermissionGranted();
    this.shakeDetector.start();
    this.shakeDetector.requestPermission();
    this.shakeDetector.subscribe(() => {
      this.diceRoll();
    });
  }

  reload = false;
}
