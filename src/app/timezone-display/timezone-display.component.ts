import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GooglePlacesService, States, Cities } from './google-places.service'

@Component({
  selector: 'app-timezone-display',
  templateUrl: './timezone-display.component.html',
  providers: [GooglePlacesService],
  styleUrls: ['./timezone-display.component.css']
})
export class TimezoneDisplayComponent implements OnInit {
  error: any;
  headers: string[];
  states: States;
  city: Cities;
  stateControl = new FormControl();
  townControl = new FormControl();
  stateNames: string[] = ['California', 'Not California', 'Do we really need a third option?'];
  townNames: string[] = ['San Diego', 'Not San Diego', "We don't need a third option"];
  filteredStateNames: Observable<string[]>;
  filteredTownNames: Observable<string[]>;
  stateControl = new FormControl();
  townControl = new FormControl();

  constructor(private forumBuilder: FormBuilder, private googlePlacesService: GooglePlacesService) { }

  ngOnInit() {
    this.filteredStateNames = this.stateControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterState(value))
      );

    this.filteredTownNames = this.townControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterTown(value))
      );
  }

  showCities() {
    this.googlePlacesService.getCities()
      .subscribe(
        (data: Cities) => this.city = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showBigCities() {
    this.googlePlacesService.getBigCities()
      .subscribe(
        (data: Cities) => this.city = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showStates() {
    this.googlePlacesService.getStates()
      .subscribe(
        (data: States) => this.states = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  clear() {
    this.states = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  makeError() {
    this.googlePlacesService.makeIntentionalError().subscribe(null, error => this.error = error);
  }
  
  private _filterTown(townValue: string): string[] {
    const filterTownValue = townValue.toLowerCase();

    return this.townNames.filter(selectedTown => selectedTown.toLowerCase().includes(filterTownValue));
  }

  private _filterState(stateValue: string): string[] {
    const filterStateValue = stateValue.toLowerCase();

    return this.stateNames.filter(selectedState => selectedState.toLowerCase().includes(filterStateValue));
  }
}
