import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivePostPageComponent } from './live-post.component';

describe('LivePostPageComponent', () => {
  let component: LivePostPageComponent;
  let fixture: ComponentFixture<LivePostPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LivePostPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivePostPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
