import { Component, Input, OnInit } from '@angular/core';
import { CountService } from '../services/count.service';
import { NumberButtonModel } from '../models/numberButton.model';
import { DiceService } from '../services/dice.service';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  @Input() color = '';
  @Input() asc = true;
  @Input() index = 0;
  buttons: NumberButtonModel[] = [];
  constructor(
    private countService: CountService,
    private diceService: DiceService
  ) {}

  ngOnInit(): void {
    this.initialize();
    this.countService.$round.subscribe(() => {
      this.initialize();
    });

    this.diceService.getDices().subscribe((dices: number[]) => {
      console.log(dices);
      this.resetPossibleButtons();
      this.setPossible(dices[0] + dices[1]);
      this.setPossible(dices[0] + dices[this.index + 2]);
      this.setPossible(dices[1] + dices[this.index + 2]);
    });
  }

  setPossible(index: number) {
    if (this.asc) {
      index = index - 2;
    } else {
      index = 14 - index - 2;
    }
    if (this.buttons[index].state === '') {
      this.buttons[index].state = 'possible';
    }
  }

  resetPossibleButtons(): void {
    this.buttons.forEach((b) => {
      b.state = '';
    });
  }

  initialize() {
    this.buttons = [];
    for (let i = 2; i <= 12; i++) {
      let number = this.asc ? i : 14 - i;
      this.buttons.push({
        number: number.toString(),
        state: '',
      });
    }
    this.buttons.push({
      number: 'X',
      state: '',
    });
  }

  buttonClicked(number: string): void {
    let index = this.buttons.findIndex((b) => b.number === number);
    if (this.buttons[index].state === 'possible') {
      this.buttons[index].state = 'clicked';
      this.countService.setPoints(
        this.color,
        this.countService.count(this.color, this.buttons)
      );
      // set state of previous button to unused
      this.buttons.forEach((b, i) => {
        if (i < index && b.state === '') {
          b.state = 'unused';
        }
      });
    } else if (this.buttons[index].state === 'clicked') {
      if (this.isLastClicked(number)) {
        this.buttons[index].state = '';
        for (let i = this.buttons.length; i > 0; i--) {
          if (this.buttons[i - 1].state === 'unused') {
            this.buttons[i - 1].state = '';
          }
          if (this.buttons[i - 1].state === 'clicked') {
            break;
          }
        }
        this.countService.setPoints(
          this.color,
          this.countService.count(this.color, this.buttons)
        );
      }
    }
  }

  isLastClicked(number: string): boolean {
    let index = this.buttons.findIndex((b) => b.number === number);
    if (
      this.buttons[index].number === 'X' ||
      (this.buttons[index].state === 'clicked' &&
        this.buttons[index + 1].state === '')
    ) {
      return true;
    }
    return false;
  }
}
