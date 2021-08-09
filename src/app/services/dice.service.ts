import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  dices: BehaviorSubject<number[]> = new BehaviorSubject(new Array<number>());

  constructor() {}

  getDices() {
    return this.dices;
  }

  setDices(dices: number[]) {
    this.dices.next(dices);
  }
}
