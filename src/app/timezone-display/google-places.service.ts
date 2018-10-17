import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface Cities {
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
}

export interface States {
  name: string;
  abbreviation: string;
}

@Injectable()
export class GooglePlacesService {
  bigCitiesURL = 'https://raw.githubusercontent.com/GaretWebster/USCityData/master/citiesOverPop1000.json';
  citiesURL = 'assets/cities.json';
  stateURL = 'https://raw.githubusercontent.com/GaretWebster/USCityData/master/states.json';

  constructor(private http: HttpClient) { }

  getStates() {
    return this.http.get<States>(this.stateURL)
      .pipe(
        //retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getBigCities() {
    return this.http.get<Cities>(this.bigCitiesURL)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getCities() {
    return this.http.get<Cities>(this.citiesURL)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

  makeIntentionalError() {
    return this.http.get('not/a/real/url')
      .pipe(
        catchError(this.handleError)
      );
  }
}
