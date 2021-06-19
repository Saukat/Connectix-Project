import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ConAdminLoginService } from './connectixService/Admin/con-admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _adminService:ConAdminLoginService,private router:Router){}

  canActivate():boolean{
    if(this._adminService.loggedIn()){
      console.log("1");
      
      return true;
    }else{
      console.log("0");
      
      this.router.navigate(['/'])
      return false;
    }
  }
  
}
