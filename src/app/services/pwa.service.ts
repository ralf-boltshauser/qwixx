import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { Platform } from '@angular/cdk/platform';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { InstallPromptComponent } from '../install-prompt/install-prompt.component';
import { timer } from 'rxjs';
import { take } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class PwaService {
  private promptEvent: any;

  constructor(
    private updates: SwUpdate,
    private bottomSheet: MatBottomSheet,
    private platform: Platform
  ) {}

  public initPwaPrompt() {
    if (this.platform.ANDROID) {
      window.addEventListener('beforeinstallprompt', (event: any) => {
        event.preventDefault();
        this.promptEvent = event;
        this.openPromptComponent('android');
      });
    }
    if (this.platform.IOS) {
      try {
        console.log(window.navigator);
        let navigator = window.navigator as any;
        const iOSCanInstall = 'standalone' in navigator;
        const iOSIsInstalled = navigator.standalone === true;
        if (iOSCanInstall && !iOSIsInstalled) {
          this.openPromptComponent('ios');
        }
      } catch (e) {
        console.log(e);
      }
    }
  }

  private openPromptComponent(mobileType: 'ios' | 'android') {
    timer(3000)
      .pipe(take(1))
      .subscribe(() =>
        this.bottomSheet.open(InstallPromptComponent, {
          data: { mobileType, promptEvent: this.promptEvent },
        })
      );
  }

  forceUpdate(): void {
    if (this.updates.isEnabled) {
      this.updates.available.subscribe((event) => {
        window.alert(
          'Ein neues Qwixx Update is verfügbar. Wir laden die App neu!'
        );
        this.updates.activateUpdate().then(() => window.location.reload());
      });
    }
  }
}
