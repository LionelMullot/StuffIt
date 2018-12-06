import { OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/models/collection';

export abstract class AbstractItemComponent implements OnInit {
  @Input('item') item;  
  protected myLittlePath: string;

  constructor(
    protected route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(this.item instanceof Collection) {
        // This path should lead to a new collection
        this.myLittlePath = params.path ? params.path + "_" : "";
        this.myLittlePath += this.item.id;
      } else {        
        // This path should not bring user to a new collection. Final item.
        this.myLittlePath = params.path ? params.path : "";
      }
    });
  }

}
