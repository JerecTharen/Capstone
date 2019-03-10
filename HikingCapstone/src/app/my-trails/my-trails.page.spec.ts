import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTrailsPage } from './my-trails.page';

describe('MyTrailsPage', () => {
  let component: MyTrailsPage;
  let fixture: ComponentFixture<MyTrailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTrailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTrailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
