import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBoxListComponent } from './item-box-list.component';

describe('ItemBoxListComponent', () => {
  let component: ItemBoxListComponent;
  let fixture: ComponentFixture<ItemBoxListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemBoxListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemBoxListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
