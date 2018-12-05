import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/models/collection';
import { AbstractItemComponent } from '../abstract/abstract-item/abstract-item.component';

@Component({
  selector: 'app-item-box',
  templateUrl: './item-box.component.html',
  styleUrls: ['./item-box.component.scss']
})
export class ItemBoxComponent extends AbstractItemComponent {

  constructor(
    protected route: ActivatedRoute
  ) { 
    super(route);
  }

}
