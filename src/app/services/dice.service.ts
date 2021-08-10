import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ThrowModel } from '../models/throw.model';

@Injectable({
  providedIn: 'root',
})
export class DiceService {
  dices: BehaviorSubject<ThrowModel> = new BehaviorSubject(new ThrowModel());

  constructor() {}

  getDices() {
    return this.dices;
  }

  setDices(dices: ThrowModel) {
    console.log(dices);
    this.dices.next(dices);
  }
}
