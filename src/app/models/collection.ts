import { Category } from "./category";

export class Collection {
  id: string;
  name: string;
  childNumber: number;
  category: Category;

  /**
   * 
   * @param parentCategory Parent category of the collection
   * @param item Category of the collection
   * @param rawJson Raw data returned by the BE
   */
  constructor(parentCategory: Category, item: Category, rawJson) {
    this.id = item.id;
    this.name = item.getName();
    this.category = parentCategory;
    this.childNumber = 0;
    this.calculateChildNumber(rawJson);
  }

  /**
   * Calculate number of collectionnable item inside a collection
   * @param rawJson Raw data returned by the BE
   * @param isChild 
   */
  protected calculateChildNumber(rawJson){
    let keys = Object.keys(rawJson);
    let hasChild = keys.includes("child");
    Object.keys(rawJson).forEach(childId => {
      if(childId === "child") {
        this.calculateChildNumber(rawJson.child);
      } else {
        let child = rawJson[childId];
        if(child.name || child.number) {
          // Final element, so just +1
          ++this.childNumber;
        } else {
          this.childNumber += Object.keys(rawJson[childId]).length
          if (hasChild) {
            --this.childNumber;
          }
        }
      }
    });
  }

  /**
   * Retrieve name of the collectionnable
   */
  public getName(): string{
    return this.name || this.id;
  }
}