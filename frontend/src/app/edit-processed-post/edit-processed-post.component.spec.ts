import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProcessedPostComponent } from './edit-processed-post.component';

describe('EditProcessedPostComponent', () => {
  let component: EditProcessedPostComponent;
  let fixture: ComponentFixture<EditProcessedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditProcessedPostComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProcessedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
