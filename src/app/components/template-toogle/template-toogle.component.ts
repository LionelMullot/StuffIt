import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-template-toogle',
  templateUrl: './template-toogle.component.html',
  styleUrls: ['./template-toogle.component.scss']
})
export class TemplateToogleComponent implements OnInit {
  @Output('template') template = new EventEmitter<string>();
  templateValue = 'list';

  constructor() { }

  ngOnInit() {
    this.templateValue = localStorage.getItem('template') || 'list';
    this.template.emit(this.templateValue);
  }

  onSelectTemplate(template: string) {
    localStorage.setItem('template', template);
    this.templateValue = template;
    this.template.emit(this.templateValue);
  }

}
