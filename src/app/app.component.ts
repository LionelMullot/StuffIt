import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppTitleService } from './services/app-title-service.service';
import { Path } from './models/path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private pageTitle = 'Stuff It !';
  
  navPath: Path[] = [];

  constructor(
    private titleService: AppTitleService
  ) { }

  ngOnInit() { 
    this.titleService.getTitle().subscribe((title) => {
      this.pageTitle = title;
    })
    this.titleService.getNavPath().subscribe((navPath) => {
      if (navPath.length > 1) {
        this.navPath = navPath;
      } else {
        this.navPath = [];
      }
    })
  }
}
