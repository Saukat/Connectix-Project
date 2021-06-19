import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AdminLogin } from 'src/app/models/admin-login';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
// import { environment } from 'src/app/appEnvironment/environment';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';



@Injectable({
  providedIn: 'root'
})
export class ConAdminLoginService {
  // adminLoginUrl="http://192.168.1.25:5858/connectix/admin/login";
  adminLoginUrl=environment.api_url+"/admin/login";

  getAdminUrl=environment.api_url+"/admin/all";

  resetPwdUrl=environment.api_url+"/admin/restPassword";
  // resetPwdUrl="https://cors-anywhere.herokuapp.com//http://localhost:5858/connectix/admin/restPassword";



  constructor(private http:HttpClient,private router:Router,private _adminService:ConAdminLoginService) { }

  adminCredential(adminLogin:AdminLogin){
        return this.http.post(this.adminLoginUrl,adminLogin);                    
  }
 
 //set token into local storage 
 public saveTokenToLocalStorage(token: string) {
  localStorage.setItem('token',token);
}

//Login
loggedIn(){
  // console.log("2");
  
  return !!localStorage.getItem('token');
}

//Remove Token For Logout
logout() {
  // console.log("Remove");
  localStorage.removeItem('token');
  this.router.navigate(['/']);

}

//getToken

getToken(){
  // console.log("token  id",localStorage.getItem('token'));
  return localStorage.getItem('token');
}


  getAdminData(){
    let token=this.getToken();
    //  console.log("Token",token);
     
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get(this.getAdminUrl,httpOptionsPlain);                  
   }


   resetAdminPasswordFun(resetData){
    let token=this.getToken();
    //  console.log("Token",token);
     
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
     
    return this.http.put(this.resetPwdUrl,resetData,httpOptionsPlain);                   
   }
 
  
}
