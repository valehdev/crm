import { Injectable } from "@angular/core";
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(
      private _authService: AuthService,
      private _router: Router
    ) {}

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {

      if (this._authService.getUserStatus() == 'admin') {
        return true;
      }

      this._authService.redirectUrl = state.url;

      this._router.navigate(['/login']);

      return false;

    }
}

