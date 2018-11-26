import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoicePopupComponent } from './choice-popup.component';

describe('ChoicePopupComponent', () => {
  let component: ChoicePopupComponent;
  let fixture: ComponentFixture<ChoicePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChoicePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChoicePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
