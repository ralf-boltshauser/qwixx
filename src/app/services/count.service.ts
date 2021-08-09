import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { NumberButtonModel } from '../models/numberButton.model';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  $round: Subject<number> = new Subject();
  round = 0;
  constructor() {
    this.$round.next(0);
  }

  points: any = { red: 0, yellow: 0, green: 0, blue: 0, faults: 0, total: 0 };

  setPoints(color: string, points: number) {
    this.points[color] = points;
    this.calculateTotal();
  }

  increaseFaults() {
    this.points.faults++;
    this.calculateTotal();
  }

  calculateTotal() {
    this.points.total =
      this.points['red'] +
      this.points['yellow'] +
      this.points['green'] +
      this.points['blue'] -
      this.points['faults'] * 5;
  }

  reset() {
    this.points = { red: 0, yellow: 0, green: 0, blue: 0, faults: 0, total: 0 };
    this.round++;
    this.$round.next(this.round);
  }

  getPoints(): any {
    return this.points;
  }

  count(color: string, buttons: NumberButtonModel[]): number {
    let count = 1;
    let total = 0;
    buttons.forEach((button) => {
      if (button.state == 'clicked') {
        total += count;
        count++;
      }
    });
    return total;
  }
}
