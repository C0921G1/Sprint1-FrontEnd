import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {TokenStorageService} from '../service/security/token-storage.service';
import Swal from 'sweetalert2';


/**
 *  TuNK
 */
@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {
  private role: string;

  constructor(private tokenStorageService: TokenStorageService,

              private router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.tokenStorageService.getToken()){
      this.role = this.tokenStorageService.getUser().roles[0];
      if (this.role == 'ROLE_ADMIN') {
        return true;
      }
    }

    this.router.navigate(['/'], {
      queryParams: { returnUrl: state.url }});

    Swal.fire({
      position: 'top',
      background: '#f8f9fa',
      width: 400,
      heightAuto: true,
      icon: 'error',
      title: 'Bạn không có quyền truy cập!',
      toast: true,
      showConfirmButton: false,
      timer: 3000,
    });


    return false;
  }
}
