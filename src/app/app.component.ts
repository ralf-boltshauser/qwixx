import { AfterViewInit, Component, OnInit } from '@angular/core';
import { UpdateService } from './services/update.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'qwixx';

  constructor(private updateService: UpdateService) {}

  ngAfterViewInit(): void {
    this.updateService.forceUpdate(); // force update on first load
  }
}
