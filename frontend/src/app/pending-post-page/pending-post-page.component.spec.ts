import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingPostPageComponent } from './pending-post-page.component';

describe('PendingPostPageComponent', () => {
  let component: PendingPostPageComponent;
  let fixture: ComponentFixture<PendingPostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingPostPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingPostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
