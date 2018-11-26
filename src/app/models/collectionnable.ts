export class Collectionnable {
  name: string;
  number: string;

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
}