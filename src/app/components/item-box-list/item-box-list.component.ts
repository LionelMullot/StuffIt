import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-item-box-list',
  templateUrl: './item-box-list.component.html',
  styleUrls: ['./item-box-list.component.scss']
})
export class ItemBoxListComponent implements OnInit {
  @Input() collection;

  constructor() { }

  ngOnInit() {
  }

}
