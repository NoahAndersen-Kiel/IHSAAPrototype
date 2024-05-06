import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetCreationComponent } from './meet-creation.component';

describe('MeetCreationComponent', () => {
  let component: MeetCreationComponent;
  let fixture: ComponentFixture<MeetCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MeetCreationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MeetCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
