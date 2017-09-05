import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ViewOccupancyComponent} from './viewOccupancy.component';

describe('ViewOccupancyComponent', () => {
  let component: ViewOccupancyComponent;
  let fixture: ComponentFixture<ViewOccupancyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ViewOccupancyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOccupancyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
