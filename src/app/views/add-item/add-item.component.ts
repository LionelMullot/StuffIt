import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { AppDataService } from './../../services/app-data.service';
import { ItemCategoryBoxComponent } from 'src/app/components/item-category-box/item-category-box.component';
import { Collectionnable } from 'src/app/models/collectionnable';
import { Category } from 'src/app/models/category';
import { AppTitleService } from 'src/app/services/app-title-service.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, AfterViewInit {

  @ViewChild('categoryContainer', {read: ViewContainerRef})
  private categoryContainer: ViewContainerRef;

  private VALIDATION_SUCCESS = 'Saisie correcte';
  private VALIDATION_FAIL = 'Saisie incorrecte';
  public validation = {
    title: null,
    message: null,
    success: null
  };

  public newItem: Collectionnable = new Collectionnable(null, null);
  private categoriesComponentRef: ItemCategoryBoxComponent[] = [];
  private categoryPath: Category[] = [];
  public categoriesList: Category[] = [];

  constructor(
    public appData: AppDataService,
    private cdRef: ChangeDetectorRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private titleService: AppTitleService) {
  }

  ngOnInit() {
    this.titleService.setTitle('Ajoutes un truc !');
    this.titleService.setNavPath([]);
  }

  ngAfterViewInit() {
    this.createNewCategoryBox(null);
  }

  /**
   * Show popup to choose categories.
   * Displayed categories will depends on latest selected category.
   */
  showPopupForCategories() {
    const categoryPathLength = this.categoryPath.length;
    if (categoryPathLength) {
      this.categoriesList = this.categoryPath[categoryPathLength - 1].children || [];
    } else {
      this.appData.getCategories()
      .take(1)
      .subscribe((categories) => {
        this.categoriesList = categories;
      });
    }
  }

  /**
   * Dynamically create category selector and keep a reference to it
   * @param category Default parent category to set to the new category box
   */
  createNewCategoryBox(category: Category) {
    const emptyCategory = this.componentFactoryResolver.resolveComponentFactory(ItemCategoryBoxComponent);
    const categoryBox = this.categoryContainer.createComponent(emptyCategory);
    categoryBox.instance.setCategory(null, category);
    this.cdRef.detectChanges();
    categoryBox.instance.clickEvent.subscribe(() => {
      this.showPopupForCategories();
    });
    this.categoriesComponentRef.push(categoryBox.instance);
  }

  /**
   * Hide popup to choose categories.
   */
  hidePopupForCategories() {
    this.categoriesList = [];
  }

  /**
   * Received when user press a button on the popup
   * @param category Category choosen by the user. If null, popup has been cancelled
   */
  onPopupValidate(category: Category) {
    const categoriesLength = this.categoriesComponentRef.length;
    const previousCategory = this.categoriesComponentRef[categoriesLength - 1];
    previousCategory.setCategory(category, previousCategory.getParentCategory());
    this.hidePopupForCategories();

    if (category != null) {
      this.categoryPath.push(category);
      // Dynamically create category selector and keep a reference to it
      this.createNewCategoryBox(category);
    }
  }

  onSubmit() {
    const path = this.categoryPath.map((category) => {
      return category.id;
    });

    /** Invalid form */
    if (path.length === 0) {
      this.toggleValidation(false, 'Au moins une categorie doit être choisie.');
      return;
    }

    if (!this.newItem.getName()) {
      this.toggleValidation(false, 'Un titre ou un numéro est nécessaire pour ajouter à la collection.');
      return;
    }

    /** Valid form */
    const hasSemicolonOnName = this.newItem.name && this.newItem.name.indexOf(';');
    const hasSemicolonOnNumber = this.newItem.getNumber() && this.newItem.getNumber().indexOf(';');
    const hasSemicolon = hasSemicolonOnName || hasSemicolonOnNumber;

    if (hasSemicolon >= 0) {
      const hasNames = this.newItem.name && !!this.newItem.name.length;
      const hasNumbers = this.newItem.number && !!this.newItem.number.length;

      const names = hasNames ? this.newItem.name.split(';') : [];
      const numbers = hasNumbers ? this.newItem.number.split(';') : [];
      const nameLength = names.length;
      const numberLength = numbers.length;
      const hasSameLength = nameLength === numberLength;
      // Multiple add
      if (!(hasSameLength || nameLength === 0 || numberLength === 0)) {
        const message = 'Pour un ajout multiple il faut que le nombre d\'entrée pour le nom soit égale au nombre d\'entrée pour le numéro.';
        this.toggleValidation(false, message);
        return;
      }
      const promises = [];
      if (nameLength !== 0) {
        names.forEach((name, index) => {
          const item = new Collectionnable({name: name, number: numbers[index]}, null);
          promises.push(this.appData.addToCollection(path, item));
        });
      } else {
        numbers.forEach((number) => {
          const item = new Collectionnable({number: number}, null);
          promises.push(this.appData.addToCollection(path, item));
        });
      }

      Promise.all(promises).then(_ => {
        this.toggleValidation(true, `L'ensemble des éléments ont été ajouté à la collection.`);
        this.resetForm();
      });
    } else {
      // Single add
      this.appData.addToCollection(path, this.newItem).then(() => {
        this.toggleValidation(true, `${this.newItem.getName()} a bien été ajouté à la collection.`);
        this.resetForm();
      });
    }
  }

  private resetForm() {
    // Reset item and categoties
    this.newItem = new Collectionnable(null, null);
    this.categoryPath = [];
    this.categoryContainer.clear();
    this.categoriesComponentRef = [];
    this.createNewCategoryBox(null);
  }

  /**
   * Toggle validation message
   * @param isValid true if form is valid
   * @param message Information message to display
   */
  toggleValidation(isValid: Boolean, message: string) {
    this.validation.success = isValid;
    this.validation.title = isValid ? this.VALIDATION_SUCCESS : this.VALIDATION_FAIL;
    this.validation.message = message;
  }


}
