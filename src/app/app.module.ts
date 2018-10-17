import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TimezoneDisplayComponent } from './timezone-display/timezone-display.component';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule,  MatFormFieldModule, MatCardModule, MatInputModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; //no clue why this is here but it removes console debug message

const modules = [
  MatAutocompleteModule,
  MatButtonModule,
  MatFormFieldModule,
  MatCardModule,
  MatButtonModule,
  MatInputModule
];

@NgModule({
  declarations: [
    AppComponent,
    TimezoneDisplayComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    modules
  ],
  exports: [
    modules
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
