import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessedPostPageComponent } from './processed-post-page.component';

describe('ProcessedPostPageComponent', () => {
  let component: ProcessedPostPageComponent;
  let fixture: ComponentFixture<ProcessedPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessedPostPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessedPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
