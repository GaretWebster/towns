import { Component, OnInit } from '@angular/core';
import * as options from 'cities.json';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
	
@Component({
  selector: 'app-timezone-display',
  templateUrl: './timezone-display.component.html',
  styleUrls: ['./timezone-display.component.css']
})
export class TimezoneDisplayComponent implements OnInit {  
  //word : string = option5[0].name;

  stateControl = new FormControl();
  //options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.stateControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
