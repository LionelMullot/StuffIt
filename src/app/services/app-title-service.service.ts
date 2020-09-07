import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Path } from '../models/path';

@Injectable({
  providedIn: 'root'
})
export class AppTitleService {

  private titleChange = new BehaviorSubject<string>('Stuff It !');
  private navPathChange = new BehaviorSubject<Path[]>([]);

  constructor() { }

  setTitle(title: string) {
    this.titleChange.next(title);
  }

  getTitle(): BehaviorSubject<string> {
    return this.titleChange;
  }

  setNavPath(path: Path[]) {
    this.navPathChange.next(path);
  }

  getNavPath(): BehaviorSubject<Path[]> {
    return this.navPathChange;
  }
}
