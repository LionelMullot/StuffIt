import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-table-list',
  templateUrl: './item-table-list.component.html',
  styleUrls: ['./item-table-list.component.scss']
})
export class ItemTableListComponent implements OnInit {
  
  @Input("collection") collection;

  constructor() { }

  ngOnInit() {
  }

}
