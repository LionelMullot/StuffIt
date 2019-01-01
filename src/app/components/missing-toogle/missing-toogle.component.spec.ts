import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingToogleComponent } from './missing-toogle.component';

describe('MissingToogleComponent', () => {
  let component: MissingToogleComponent;
  let fixture: ComponentFixture<MissingToogleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MissingToogleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MissingToogleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
