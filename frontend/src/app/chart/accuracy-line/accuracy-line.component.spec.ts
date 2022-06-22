import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccuracyLineComponent } from './accuracy-line.component';

describe('AccuracyLineComponent', () => {
  let component: AccuracyLineComponent;
  let fixture: ComponentFixture<AccuracyLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccuracyLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccuracyLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
