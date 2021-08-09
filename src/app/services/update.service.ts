import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  constructor(appRef: ApplicationRef, private updates: SwUpdate) {}

  forceUpdate(): void {
    if (this.updates.isEnabled) {
      this.updates.available.subscribe((event) => {
        window.alert('We are updating Qwixx. Update will follow shortly.');
        this.updates.activateUpdate().then(() => window.location.reload());
      });
    }
  }
}
