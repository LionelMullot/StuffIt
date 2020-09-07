export class Path {
  name: string;
  path: string;
  queryParams: object;

  constructor(name: string, path: string, queryParams: object) {
    this.name = name;
    this.path = path;
    this.queryParams = queryParams;
  }
}
