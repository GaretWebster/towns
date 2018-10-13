import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimezoneDisplayComponent } from './timezone-display.component';

describe('TimezoneDisplayComponent', () => {
  let component: TimezoneDisplayComponent;
  let fixture: ComponentFixture<TimezoneDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimezoneDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimezoneDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
