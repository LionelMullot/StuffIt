import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoryBoxComponent } from './item-category-box.component';

describe('ItemCategoryBoxComponent', () => {
  let component: ItemCategoryBoxComponent;
  let fixture: ComponentFixture<ItemCategoryBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCategoryBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategoryBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
