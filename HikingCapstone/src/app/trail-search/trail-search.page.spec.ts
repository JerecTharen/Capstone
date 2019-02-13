import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailSearchPage } from './trail-search.page';

describe('TrailSearchPage', () => {
  let component: TrailSearchPage;
  let fixture: ComponentFixture<TrailSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
