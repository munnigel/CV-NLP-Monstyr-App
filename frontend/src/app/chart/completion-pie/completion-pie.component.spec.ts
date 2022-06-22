import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletionPieComponent } from './completion-pie.component';

describe('CompletionPieComponent', () => {
  let component: CompletionPieComponent;
  let fixture: ComponentFixture<CompletionPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompletionPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompletionPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
