import { Component, OnInit } from '@angular/core';
import { CountService } from '../count.service';

@Component({
  selector: 'app-calculate',
  templateUrl: './calculate.component.html',
  styleUrls: ['./calculate.component.scss']
})
export class CalculateComponent implements OnInit {

  constructor(public countService: CountService) { }
  
  ngOnInit(): void {
  }

}
