import { Injectable } from '@angular/core';
import { ThrowModel } from '../models/throw.model';

@Injectable({
  providedIn: 'root',
})
export class RootService {
  enabled = false;
  nextThrow = new ThrowModel([0, 0, 0, 0, 0, 0]);
  constructor() {}

  finishColor(color: string) {
    let dices = [0, 0, 0, 0, 0, 0];
    dices.forEach((dice, index) => {
      let value = Math.floor(Math.random() * 4) + 2;
      dices[index] = value;
    });
    if (color == 'red' || color == 'yellow') {
      dices[Math.floor(Math.random() * 2)] = 6;
      if (color == 'red') {
        dices[2] = 6;
      }
      if (color == 'yellow') {
        dices[3] = 6;
      }
    }
    if (color == 'blue' || color == 'green') {
      dices[Math.floor(Math.random() * 2)] = 1;
      if (color == 'blue') {
        dices[4] = 1;
      }
      if (color == 'green') {
        dices[5] = 1;
      }
    }
    this.nextThrow = new ThrowModel(dices);
  }

  clearNextThrow() {
    this.nextThrow = new ThrowModel([0, 0, 0, 0, 0, 0]);
  }
}
