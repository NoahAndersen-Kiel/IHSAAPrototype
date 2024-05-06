import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetSelectorComponent } from './meet-selector.component';

describe('MeetSelectorComponent', () => {
  let component: MeetSelectorComponent;
  let fixture: ComponentFixture<MeetSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
