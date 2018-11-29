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
   */
  protected calculateChildNumber(rawJson){
    Object.keys(rawJson).forEach(childId => {
      if(childId === "child") {
        this.calculateChildNumber(rawJson.child);
      } else {
        let child = rawJson[childId];         
        this.childNumber += Object.keys(child).length;
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