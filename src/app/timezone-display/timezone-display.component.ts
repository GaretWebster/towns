import { Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GooglePlacesService, Config, Cities } from './google-places.service'

//import * as options from 'cities.json';

/*export interface Cities {
  geonameid: number;
  name: string;
  asciiname: string;
  alternatenames: string;
  latitude: number;
  longitude: number;
  feature_class: string;
  feature_code: string;
  country_code: string;
  cc2: string;
  admin1_code: string;
  admin2_code: string;
  admin3_code: string;
  admin4_code: string;
  population: number;
  elevation: number;
  dem: number;
  timezone: string;
  modification_date: string;
}*/

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
    //this.getCities();

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

  showConfig_v1() {
    this.googlePlacesService.getConfig_1()
      .subscribe((data: Config) => this.config = {
        heroesUrl: data['heroesUrl'],
        textfile: data['textfile']
      });
  }

  showConfig_v2() {
    this.googlePlacesService.getConfig()
      // clone the data object, using its known Config shape
      .subscribe((data: Config) => this.config = { ...data });
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

  /*showCities() {
    this.googlePlacesService.getCities()
      .subscribe((data: Cities) => this.city = { ...data });
  }
  options = this.city.name;*/

  stateControl = new FormControl();
  //options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
