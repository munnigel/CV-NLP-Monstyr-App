import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptancePieComponent } from './acceptance-pie.component';

describe('AcceptancePieComponent', () => {
  let component: AcceptancePieComponent;
  let fixture: ComponentFixture<AcceptancePieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AcceptancePieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptancePieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
