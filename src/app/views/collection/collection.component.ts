import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  navPath: string[] = ['Marine & Lionel', 'collections', 'jeux de société'];
  constructor() { }

  ngOnInit() {
  }

}
