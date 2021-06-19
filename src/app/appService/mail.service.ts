import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  hirerAuthMailUrl=environment.api_url+"/employee/hireAuthEmail/";
  substituteMailUrl=environment.api_url+"/employee/substituteEmail/";
  mailSendingUrl=environment.api_url+"/email/sendEmail";


  constructor(private http:HttpClient,private _adminService:ConAdminLoginService) { }
  
  hirerAuthMailsending(id){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
     return this.http.get(this.hirerAuthMailUrl+id,httpOptionsPlain);
  }

  substituteMailsending(id){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
     return this.http.get(this.substituteMailUrl+id,httpOptionsPlain);
  }
 
  mailSending(mailInformation){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
      return this.http.post(this.mailSendingUrl,mailInformation,httpOptionsPlain)
  }


}
