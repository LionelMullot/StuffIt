import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateToogleComponent } from './template-toogle.component';

describe('TemplateToogleComponent', () => {
  let component: TemplateToogleComponent;
  let fixture: ComponentFixture<TemplateToogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemplateToogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
