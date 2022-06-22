import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatencyBarComponent } from './latency-bar.component';

describe('LatencyBarComponent', () => {
  let component: LatencyBarComponent;
  let fixture: ComponentFixture<LatencyBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatencyBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatencyBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
