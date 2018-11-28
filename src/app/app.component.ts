import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { AppTitleService } from './services/app-title-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private pageTitle = 'Stuff It !';
  
  navPath: string[] = ['Marine & Lionel', 'Collections', 'Jeux de société'];

  constructor(
    private titleService: AppTitleService
  ) { }

  ngOnInit() { 
    this.titleService.getTitle().subscribe((title) => {
      this.pageTitle = title;
    })
  }
}
