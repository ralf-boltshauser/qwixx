import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import ShakeDetector from 'shake-detector';
import { JoinComponent } from '../join/join.component';
import { ThrowModel } from '../../../models/throw.model';
import { DiceService } from '../../../services/dice.service';
import { MultiplayerService } from '../../../services/multiplayer.service';
import { RootService } from 'src/app/services/root.service';
import { RootComponent } from '../root/root.component';
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
  constructor(
    private diceService: DiceService,
    public dialog: MatDialog,
    public multiplayerService: MultiplayerService,
    public rootService: RootService
  ) {}
  
  canRoll = true;
  public diceValues: ThrowModel = new ThrowModel();

  public colors = ['white', 'white', 'red', 'yellow', 'green', 'blue'];

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit(): void {
    this.multiplayerService.connected.subscribe((connected) => {
      if (connected) {
        this.multiplayerService
          .getDices()
          .subscribe((dices: ThrowModel | null) => {
            if (dices) {
              console.log('Dices: ', dices);
              this.remoteDiceRoll(dices);
            }
          });
      }
    });
  }

  remoteDiceRoll(dices: ThrowModel) {
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        if (i == 9) {
          this.canRoll = true;
          this.diceService.setDices(dices);
          this.roll(Object.values(dices.dices));
        } else {
          this.roll();
        }
      }, Math.pow(i / 3, 2) * 100);
    }
  }

  diceRoll() {
    if (this.canRoll && this.multiplayerService.connected.getValue()) {
      let dices = [];
      for (let i = 0; i < 6; i++) {
        dices.push(Math.floor(Math.random() * 6) + 1);
      }
      this.multiplayerService.throw();
    } else if (this.canRoll) {
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

  roll(givenDices?: number[]) {
    if (givenDices) {
      this.diceValues = new ThrowModel(givenDices);
    } else {
      let dices = [];
      for (let i = 0; i < 6; i++) {
        dices.push(Math.floor(Math.random() * 6) + 1);
      }
      this.diceValues = new ThrowModel(dices);
    }
  }

  reload = false;

  // Multiplayer stuff
  openDialog(): void {
    let id = this.multiplayerService.makeid(4);
    const dialogRef = this.dialog.open(JoinComponent, {
      width: '250px',
      data: { id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result != null) {
        if (result.id == 'root') {
          this.rootService.enabled = true;
          return;
        }
        if (result.createLobby) {
          console.log('create lobby');
          this.multiplayerService.setId(result.id);
          this.multiplayerService.connected.next(true);
        } else {
          this.multiplayerService.setId(result.id);
        }
      }
    });
  }

  openRoot() {
    const dialogRef = this.dialog.open(RootComponent, {
      width: '250px',
      data: { color: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.rootService.finishColor(result);
    });
  }
}
