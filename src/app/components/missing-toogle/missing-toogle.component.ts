import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-missing-toogle',
  templateUrl: './missing-toogle.component.html',
  styleUrls: ['./missing-toogle.component.scss']
})
export class MissingToogleComponent implements OnInit {

  @Output('missing') missing = new EventEmitter<boolean>();
  missingActivated: boolean = false;

  constructor() { }

  ngOnInit() { 
    this.missingActivated = localStorage.getItem('missingActivated') === "true";
    this.missing.emit(this.missingActivated);
  }

  onMissingChange(missing: boolean) {
    localStorage.setItem('missingActivated', missing.toString());
    this.missingActivated = missing;
    this.missing.emit(this.missingActivated);
  }

}
