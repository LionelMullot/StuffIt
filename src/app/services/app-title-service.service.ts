import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppTitleService {

  private titleChange = new BehaviorSubject<string>("Stuff It !");

  constructor() { }

  setTitle(title: string) { 
    this.titleChange.next(title);
  }

  getTitle(): BehaviorSubject<string> {
    return this.titleChange;
  }
}
