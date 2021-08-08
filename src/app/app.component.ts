import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'qwixx';

  constructor() {
    screen.orientation.lock('landscape').then(() => {
      console.log('Orientation locked!');
    });
  }
}
