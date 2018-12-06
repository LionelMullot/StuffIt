import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppDataService } from '../services/app-data.service';

@Injectable({
  providedIn: 'root'
})
export class LoginActivateGuard implements CanActivate {
  constructor(
    private appDate: AppDataService, 
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.appDate.getCurrentUser()) {
        return true;
      }
      this.router.navigate(['/login']);
      return false;
  }
}
