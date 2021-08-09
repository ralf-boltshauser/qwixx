import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RowComponent } from './row/row.component';
import { MatButtonModule } from '@angular/material/button';
import { CalculateComponent } from './calculate/calculate.component';
import { MatIconModule } from '@angular/material/icon';
import { DiceComponent } from './dice/dice.component';
import { ThrowComponent } from './throw/throw.component';
@NgModule({
  declarations: [AppComponent, RowComponent, CalculateComponent, DiceComponent, ThrowComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable',
    }),
    MatButtonModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
