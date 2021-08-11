import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-udpate',
  templateUrl: './udpate.component.html',
  styleUrls: ['./udpate.component.scss'],
})
export class UdpateComponent implements OnInit {
  constructor(private bottomSheetRef: MatBottomSheetRef<UdpateComponent>) {}

  // eslint-disable-next-line
  ngOnInit(): void {}

  public close() {
    this.bottomSheetRef.dismiss();
  }
}
