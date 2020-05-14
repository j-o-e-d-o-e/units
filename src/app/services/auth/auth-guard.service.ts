import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let activate: boolean;
    if (state.url === '/settings') {
      activate = this.authService.isAdmin();
    } else {
      activate = this.authService.isAuthenticated();
    }
    if (!activate) {
      this.router.navigate(['']).catch();
    }
    return activate;
  }
}
