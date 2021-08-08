import { Component, Input, OnInit } from '@angular/core';
import { CountService } from '../count.service';
import { NumberButtonModel } from '../models/numberButton.model';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent implements OnInit {
  @Input() color = '';
  @Input() asc = true;
  buttons: NumberButtonModel[] = [];
  constructor(private countService: CountService) {}

  ngOnInit(): void {
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
    if (this.buttons[index].state === '') {
      this.buttons[index].state = 'clicked';
      console.log(this.buttons);
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
    }
  }
}
