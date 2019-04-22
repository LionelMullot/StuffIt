import { Component } from '@angular/core';
import { Router} from '@angular/router';
import { AppTitleService } from './services/app-title-service.service';
import { Path } from './models/path';
import { AppDataService } from './services/app-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {}

  ngOnInit() {}
}
