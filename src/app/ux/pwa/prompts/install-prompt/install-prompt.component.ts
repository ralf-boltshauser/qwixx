import { Component, Inject, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-install-prompt',
  templateUrl: './install-prompt.component.html',
  styleUrls: ['./install-prompt.component.scss'],
})
export class InstallPromptComponent implements OnInit {
  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA)
    public data: { mobileType: 'ios' | 'android'; promptEvent?: any },
    private bottomSheetRef: MatBottomSheetRef<InstallPromptComponent>
  ) {}

  //eslint-disable-next-line
  ngOnInit() {}

  public installPwa(): void {
    this.data.promptEvent.prompt();
    this.close();
  }

  public close() {
    this.bottomSheetRef.dismiss();
  }
}
