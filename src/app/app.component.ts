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
      document.querySelector('#container')?.requestFullscreen();
    }
    screen.orientation
      .lock('landscape')
      .then(function () {
        alert('Locked');
      })
      .catch(function (error) {
        alert(error);
      });
  }
}
