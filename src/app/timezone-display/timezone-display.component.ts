import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GooglePlacesService, Config, Cities } from './google-places.service'

//import * as options from 'cities.json';

@Component({
  selector: 'app-timezone-display',
  templateUrl: './timezone-display.component.html',
  providers: [GooglePlacesService],
  styleUrls: ['./timezone-display.component.css']
})
export class TimezoneDisplayComponent implements OnInit {
  error: any;
  headers: string[];
  city: Cities;
  config: Config;

  constructor(private googlePlacesService: GooglePlacesService) { }

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
  }

  ngOnInit() {
    this.filteredOptions = this.stateControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  showConfig() {
    this.googlePlacesService.getConfig()
      .subscribe(
        (data: Config) => this.config = { ...data }, // success path
        error => this.error = error // error path
      );
  }

  showConfigResponse() {
    this.googlePlacesService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ...resp.body };
      });
  }

  makeError() {
    this.googlePlacesService.makeIntentionalError().subscribe(null, error => this.error = error);
  }

  showCities() {
    this.googlePlacesService.getCities()
      .subscribe(
        (data: Cities) => this.city = { ...data }, // success path
        error => this.error = error // error path
      );
  }
  //options = this.city.name;

  stateControl = new FormControl();
  //options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
