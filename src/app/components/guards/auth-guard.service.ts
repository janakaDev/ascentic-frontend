import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  Route
} from '@angular/router';
import { LocalStorage } from '../../../common/local-storage';
import { AuthService } from '../../core/Service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(
    private storage: LocalStorage,
    private router: Router,
    private auth: AuthService
  ) {}

  async canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.currentUserAuthenticationToken$.value) {
      this.router.navigateByUrl('/login');
      return false;
    }

    if (this.auth.isUserExist$.value) {
      return true;
    }

    // navigate to login page
    this.auth.clearLocalStorage();
    this.router.navigate(['/login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
