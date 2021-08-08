import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'qwixx';

  constructor() {}
  ngOnInit(): void {
    if (document?.querySelector('#container')?.requestFullscreen) {
      document
        .querySelector('#container')
        ?.requestFullscreen()
        .then(() => {
          screen.orientation
            .lock('landscape-primary')
            .then(function () {
              alert('Locked');
            })
            .catch(function (error) {
            });
        });
    }
  }
}
