export class Category {
  id: string;
  name: string;
  namePlural: string;
  model: object;
  children: Category[];

  constructor(id: string, rawJson) {
    this.id = id;
    this.name = rawJson.name;
    this.namePlural = rawJson.namePlural;
    this.model = rawJson.model;
    this.children = this.buildChildCategory(rawJson.child);
  }

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