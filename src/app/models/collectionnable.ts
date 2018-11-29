import { Category } from "./category";

export class Collectionnable {
  name: string;
  number: string;
  category: Category;

  constructor(rawData, category : Category) {
    if (rawData) {
      this.name = rawData.name;
      this.number = rawData.number;
    }
    this.category = category;
  }

  /**
   * Retrieve name of the collectionnable
   */
  public getName(): string{
    return this.name || (this.number ? `Tome ${this.number}` : null);
  }

  /**
   * Retrieve number in the serie of the collectionnable
   */
  public getNumber(): string {
    return this.number;
  }

  getFormatted(): object {
    let collectionnable = {};
    return {
      name: this.name || null,
      number: this.number || null
    }
  }
}