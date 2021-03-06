import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { RowComponent } from './client/landscape/row/row.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { CalculateComponent } from './client/landscape/calculate/calculate.component';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatDividerModule} from '@angular/material/divider';

import { DiceComponent } from './client/portrait/dice/dice.component';
import { ThrowComponent } from './client/portrait/throw/throw.component';
import { GameComponent } from './host/game/game.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { JoinComponent } from './client/portrait/join/join.component';
import { InstallPromptComponent } from './ux/pwa/prompts/install-prompt/install-prompt.component';
import { PwaService } from './services/pwa.service';
import { UdpateComponent } from './ux/pwa/prompts/udpate/udpate.component';
import { RootComponent } from './client/portrait/root/root.component';

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
    UdpateComponent,
    RootComponent,
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
    MatDividerModule,
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
