import { OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/models/collection';
import { User } from 'src/app/models/user';

export abstract class AbstractItemComponent implements OnInit {
  @Input() item;
  public myLittlePath: string;
  public myLittleUser: string;

  constructor(
    protected route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.myLittleUser = params.user;
      if (this.item instanceof Collection) {
        // This path should lead to a new collection
        this.myLittlePath = params.path ? params.path + ' ' : '';
        this.myLittlePath += this.item.id;
      } else if (this.item instanceof User) {
        this.myLittlePath = '';
        this.myLittleUser = this.item.id;
      } else {
        // This path should not bring user to a new collection. Final item.
        this.myLittlePath = params.path ? params.path : '';
      }
    });
  }

}
