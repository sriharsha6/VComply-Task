import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnetimeComponent } from './onetime.component';

describe('OnetimeComponent', () => {
  let component: OnetimeComponent;
  let fixture: ComponentFixture<OnetimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnetimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnetimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
