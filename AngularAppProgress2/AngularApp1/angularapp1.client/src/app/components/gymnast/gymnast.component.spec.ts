import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GymnastComponent } from './gymnast.component';

describe('GymnastComponent', () => {
  let component: GymnastComponent;
  let fixture: ComponentFixture<GymnastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GymnastComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GymnastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
