import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeveloperToolsPageComponent } from './developer-tools-page.component';

describe('DeveloperToolsPageComponent', () => {
  let component: DeveloperToolsPageComponent;
  let fixture: ComponentFixture<DeveloperToolsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeveloperToolsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeveloperToolsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
