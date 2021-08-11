import { Component, OnInit } from '@angular/core';
import { MultiplayerService } from '../services/multiplayer.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  constructor(public multiplayerService: MultiplayerService) {}

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {}

  throw() {
    let dices = this.multiplayerService.throw();
    console.log(dices);
  }
}
