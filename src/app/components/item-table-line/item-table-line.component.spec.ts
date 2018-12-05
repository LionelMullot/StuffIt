import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTableLineComponent } from './item-table-line.component';

describe('ItemTableLineComponent', () => {
  let component: ItemTableLineComponent;
  let fixture: ComponentFixture<ItemTableLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemTableLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemTableLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
