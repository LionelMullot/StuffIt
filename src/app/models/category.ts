export class Category {
  id: string;
  name: string;
  namePlural: string;
  model: object;
  children: Category[];

  /**
   * 
   * @param id Id of the category
   * @param rawJson Raw data returned by the BE
   */
  constructor(id: string, rawJson) {
    this.id = id;
    this.name = rawJson.name;
    this.namePlural = rawJson.namePlural;
    this.model = rawJson.model;
    this.children = this.buildChildCategory(rawJson.child);
    if (this.children) {
      this.children.sort((a, b) => {
        let aName = a.getName().toLowerCase();
        let bName = b.getName().toLowerCase();
        if (aName === bName) {
          return 0;
        } else if (aName > bName) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  }

  /**
   * Retrieve the name of the category
   */
  public getName() {
    return this.name;
  }

  /**
   * Allow to build children category of the current category
   * @param rawChildren Raw data returned by the BE
   */
  protected buildChildCategory(rawChildren): Category[] {
    var children: Category[];
    if (rawChildren) {
      children = Object.keys(rawChildren).map((id) => {
        return new Category(id, rawChildren[id]);
      })
    }
    return children;
  }
}