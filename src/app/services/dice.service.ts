import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  dices: Subject<number[]> = new Subject();

  constructor() {}

  getDices() {
    return this.dices;
  }

  setDices(dices: number[]) {
    this.dices.next(dices);
  }
}
