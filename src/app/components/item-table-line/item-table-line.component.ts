import { Component, OnInit, Input, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Collection } from 'src/app/models/collection';
import { AbstractItemComponent } from '../abstract/abstract-item/abstract-item.component';

@Component({
  selector: '[app-item-table-line]',
  templateUrl: './item-table-line.component.html',
  styleUrls: ['./item-table-line.component.scss']
})
export class ItemTableLineComponent extends AbstractItemComponent {

  constructor(
    protected route: ActivatedRoute,
    protected router: Router
  ) { 
    super(route);
  }

  @HostListener('click', ['$event'])
  onClick() {
    this.router.navigate(['/collection'], { queryParams: {path: this.myLittlePath }});
  }

}
