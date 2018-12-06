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
  private pageTitle = 'Stuff It !';
  private user;
  
  navPath: Path[] = [];

  constructor(
    private titleService: AppTitleService,
    private appData: AppDataService,
    private router: Router
  ) { }

  ngOnInit() { 
    this.titleService.getTitle().subscribe((title) => {
      this.pageTitle = title;
    });
    this.titleService.getNavPath().subscribe((navPath) => {
      if (navPath.length > 1) {
        this.navPath = navPath;
      } else {
        this.navPath = [];
      }
    });
    this.appData.userEmitter.subscribe((user) => {
      this.user = user;
    });
  }

  onDisconnect() {
    this.appData.logOut();
    this.router.navigate(['/search']);

  }
}
