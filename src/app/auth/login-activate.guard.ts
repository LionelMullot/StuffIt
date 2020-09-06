import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AppDataService } from '../services/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate {
  constructor(
    private appData: AppDataService, 
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return this.appData.asyncGetCurrentUser().then((user) => {
      if (user) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    });
  }
}
