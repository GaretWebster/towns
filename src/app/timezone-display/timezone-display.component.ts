import { Component, OnInit } from '@angular/core';
import * as data from 'cities.json';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-timezone-display',
  templateUrl: './timezone-display.component.html',
  styleUrls: ['./timezone-display.component.css']
})
export class TimezoneDisplayComponent implements OnInit {
	const word = (<any>data)[0].name;
	console.log(word); // output 'testing'

	stateCtrl = new FormControl('');

  constructor() { }

  ngOnInit() {
  }

}
