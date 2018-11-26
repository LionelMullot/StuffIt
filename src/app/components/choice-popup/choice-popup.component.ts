import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppDataService } from 'src/app/services/app-data.service';
import { Category } from 'src/app/models/category';

@Component({
  selector: 'app-choice-popup',
  templateUrl: './choice-popup.component.html',
  styleUrls: ['./choice-popup.component.scss']
})
export class ChoicePopupComponent implements OnInit {
  @Input('inputVar') optionsList: any[];
  @Output('validate') validate = new EventEmitter<Category>();
  
  private currentChoice: any;

  constructor(public appData: AppDataService) { }

  ngOnInit() {}

  onValidate(cancel: boolean) {
    if(cancel) {
      this.currentChoice = null;
    }
    this.validate.emit(this.currentChoice);
  }
}
