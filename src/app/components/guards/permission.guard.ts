import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '../../../common/local-storage';
import { AuthService } from '../../core/Service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(
    private store: LocalStorage,
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const routePermission = route.data.permissions;

    let canActivate = false;
    const currentUserPermissions = this.auth.currentUserPermissions$.getValue();

    [...routePermission].forEach((permission: string) => {
      // checks if the active user permission set has the route permission
      // Add usertype checking if needed for advanced routing validation
      if (currentUserPermissions.includes(permission)) {
        canActivate = true;
      } else {
        this.router.navigateByUrl('/not-allowed');
        return false;
      }
    });

    return canActivate;
  }
}
