import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Collection } from 'src/app/models/collection';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-item-table-list',
  templateUrl: './item-table-list.component.html',
  styleUrls: ['./item-table-list.component.scss']
})
export class ItemTableListComponent implements OnInit {

  @Input() collection;
  @Input() header;

  public displayedColumns: string[] = ['numero', 'title', 'childNumber'];

  constructor(
    protected route: ActivatedRoute,
    protected router: Router
  ) { }

  ngOnInit() {
  }

  onClick(item) {
    const params = this.route.snapshot.queryParams;

    let myLittleUser = params.user;
    let myLittlePath;
    if (item instanceof Collection) {
      // This path should lead to a new collection
      myLittlePath = params.path ? params.path + ' ' : '';
      myLittlePath += item.id;
    } else if (item instanceof User) {
      myLittlePath = '';
      myLittleUser = item.id;
    } else {
      // This path should not bring user to a new collection. Final item.
      myLittlePath = params.path ? params.path : '';
    }
    this.router.navigate(['/collection'], { queryParams: {path: myLittlePath, user: myLittleUser }});
  }
}
