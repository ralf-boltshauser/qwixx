import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { RowComponent } from './row/row.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CalculateComponent } from './calculate/calculate.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';

import { DiceComponent } from './dice/dice.component';
import { ThrowComponent } from './throw/throw.component';
import { GameComponent } from './game/game.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { JoinComponent } from './join/join.component';
import { InstallPromptComponent } from './install-prompt/install-prompt.component';
import { PwaService } from './services/pwa.service';

const initializer = (pwaService: PwaService) => () =>
  pwaService.initPwaPrompt();
@NgModule({
  declarations: [
    AppComponent,
    RowComponent,
    CalculateComponent,
    DiceComponent,
    ThrowComponent,
    GameComponent,
    JoinComponent,
    InstallPromptComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable',
    }),
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatBottomSheetModule,
    MatDialogModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [PwaService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
