export class ThrowModel {
  dice0: number = 0;
  dice1: number = 0;
  dice2: number = 0;
  dice3: number = 0;
  dice4: number = 0;
  dice5: number = 0;

  constructor(dices?: number[]) {
    if (dices != undefined && dices?.length > 0) {
      this.dice0 = dices[0];
      this.dice1 = dices[1];
      this.dice2 = dices[2];
      this.dice3 = dices[3];
      this.dice4 = dices[4];
      this.dice5 = dices[5];
    }
  }

  get dices(): number[] {
    let array = [];
    array.push(this.dice0);
    array.push(this.dice1);
    array.push(this.dice2);
    array.push(this.dice3);
    array.push(this.dice4);
    array.push(this.dice5);
    return array as number[];
  }
}
