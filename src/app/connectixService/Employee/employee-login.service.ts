import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'src/app/appEnvironment/environment';
import { EmployeeLogin } from 'src/app/models/employee-login';
import { ConAdminLoginService } from '../Admin/con-admin-login.service';
import { environment } from 'src/environments/environment.prod';
import { ResetPassword } from 'src/app/models/reset-password';
@Injectable({
  providedIn: 'root'
})
export class EmployeeLoginService {
 empName;
  // empLoginUrl="http://192.168.1.25:5858/connectix/employeeLogin/login";
    empLoginUrl=environment.api_url+"/employeeLogin/login";

    resetPasswordUrl=environment.api_url+"/employee/changePassword";

  constructor(private http:HttpClient,private _adminService:ConAdminLoginService) { }

//  employeeLoginCredential(empLogin:EmployeeLogin){
//   let token=this._adminService.getToken();
//   console.log("Token",token);
  
//  const httpOptionsPlain = {
//    headers: new HttpHeaders({
//      'Authorization': token
//    }),
//    responseType: 'text' as 'json'
//  };
//         return this.http.post(this.empLoginUrl,httpOptionsPlain);
                           
//   }

 employeeLoginCredential(empLogin:EmployeeLogin){
          // console.log("saukat",empLogin);          
        return this.http.post(this.empLoginUrl,empLogin,);                      
  }

  employeeResetPassword(changePwd:ResetPassword){
    // console.log("saukat",changePwd);     
    
      let token=this._adminService.getToken();
    //  console.log("Token",token);
  
  return this.http.put(this.resetPasswordUrl,changePwd,{responseType:'text' as 'json'});                      
}


 
}
