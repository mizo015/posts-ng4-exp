import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZipcodesComponent } from './zipcodes.component';

describe('ZipcodesComponent', () => {
  let component: ZipcodesComponent;
  let fixture: ComponentFixture<ZipcodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZipcodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZipcodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
