import { Component, OnInit } from '@angular/core';
import { Path } from '../../models/path';
import { AppTitleService } from '../../services/app-title-service.service';
import { Router } from '../../../../node_modules/@angular/router';
import { AppDataService } from '../../services/app-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  pageTitle = 'Stuff It !';
  user;
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
