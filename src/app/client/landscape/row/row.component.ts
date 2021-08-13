import { Component, Input, OnInit } from '@angular/core';
import { CountService } from '../../../services/count.service';
import { NumberButtonModel } from '../../../models/numberButton.model';
import { DiceService } from '../../../services/dice.service';
import { ThrowModel } from '../../../models/throw.model';
import { MultiplayerService } from 'src/app/services/multiplayer.service';

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
    private diceService: DiceService,
    private multiPlayerService: MultiplayerService
  ) {}

  ngOnInit(): void {
    this.initialize();
    this.countService.$round.subscribe(() => {
      this.initialize();
    });

    this.diceService.getDices().subscribe((dices: ThrowModel) => {
      let numbers = Object.values(dices.dices);
      //console.log(numbers);
      if (numbers.length !== 0 && numbers[0] !== 0) {
        this.generatePossible(numbers);
      }
    });
  }

  generatePossible(numbers: number[]): void {
    this.resetPossibleButtons();
    this.setPossible(numbers[0] + numbers[1], '1');
    this.setPossible(numbers[0] + numbers[this.index + 2], '2');
    this.setPossible(numbers[1] + numbers[this.index + 2], '2');
  }

  setPossible(index: number, type: string) {
    if (this.asc) {
      index = index - 2;
    } else {
      index = 14 - index - 2;
    }
    //console.log('Poissible: ', index);
    if (this.buttons[index].state === '') {
      this.buttons[index].state = 'possible' + type;
    }
  }

  resetPossibleButtons(): void {
    this.buttons.forEach((b) => {
      if (b.state === 'possible1' || b.state === 'possible2') {
        b.state = '';
      }
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
    if (
      this.buttons[index].state === '' ||
      this.buttons[index].state === 'possible1' ||
      this.buttons[index].state === 'possible2'
    ) {
      this.buttons[index].state = 'clicked';
      this.countService.setPoints(
        this.color,
        this.countService.count(this.color, this.buttons)
      );
      // set state of previous button to unused
      this.buttons.forEach((b, i) => {
        if (
          i < index &&
          (b.state === '' || b.state === 'possible1' || b.state === 'possible2')
        ) {
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
        const dices = this.diceService.getDices().getValue();

        let numbers = Object.values(dices.dices);
        if (numbers.length !== 0 && numbers[0] !== 0) {
          this.generatePossible(numbers);
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
        (this.buttons[index + 1].state === '' ||
          this.buttons[index + 1].state === 'possible1' ||
          this.buttons[index + 1].state === 'possible2'))
    ) {
      return true;
    }
    return false;
  }
}
