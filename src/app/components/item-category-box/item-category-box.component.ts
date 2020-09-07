import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-item-category-box',
  templateUrl: './item-category-box.component.html',
  styleUrls: ['./item-category-box.component.scss', './../item-box/item-box.component.scss']
})
export class ItemCategoryBoxComponent implements OnInit {

  @Output() clickEvent = new EventEmitter();
  public currentCategory: Category;
  public parentCategory: Category;

  constructor() { }

  ngOnInit() {
  }

  @HostListener('click')
  onClick() {
    if (!this.currentCategory) {
      this.clickEvent.emit();
    }
  }

  /**
   * Setter for current category
   * @param category Category to set to the category box
   */
  setCategory(category: Category, parentCategory: Category) {
    this.currentCategory = category;
    this.parentCategory = parentCategory;
  }

  /**
   * Getter for current category
   */
  getCategory() {
    return this.currentCategory;
  }

  /**
   * Getter for parent category
   */
  getParentCategory() {
    return this.parentCategory;
  }

}
