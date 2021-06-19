import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {

  claimReimbursementUrl=environment.api_url+"/reimbursement/save"

  getHigherAuthNameUrl=environment.api_url+"/employee/higherAuthName/"

  getAllReimByEmpIdUrl=environment.api_url+"/reimbursement/getAllReim/"

  getAllReimUrl=environment.api_url+"/reimbursement/allEmpReim"

  updateReportStatusUrl=environment.api_url+"/reimbursement/updateStatus"


  updateReimUrl=environment.api_url+"/reimbursement/update"

  getReimRecordsByHigherAuthUrl=environment.api_url+"/reimbursement/getReimRequest/"

  reimUpdatekUrl=environment.api_url+"/reimbursement/updateStatus"

  fileUploadUrl=environment.api_url+"/files/upload/"

  calendarWiseRecordsUrl=environment.api_url+"/reimbursement/payWithAccNo"

  getReimAllData;

  getReimSingleData;
  constructor(private http:HttpClient,private _adminService:ConAdminLoginService) { }

  claimReimbursement(reimbursement){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      // responseType: 'text' as 'json'
    };
     return this.http.post(this.claimReimbursementUrl,reimbursement,httpOptionsPlain);
  }


  
  getHigherAuthNameByEmpId(id){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
     return this.http.get(this.getHigherAuthNameUrl+id,httpOptionsPlain);
  }




  getAllReim(){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
     return this.http.get(this.getAllReimUrl,httpOptionsPlain);
  }


  getAllReimForText(){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
     return this.http.get(this.calendarWiseRecordsUrl,httpOptionsPlain);
  }


  getAllReimById(id){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
     return this.http.get(this.getAllReimByEmpIdUrl+id,httpOptionsPlain);
  }


  getReimRecordsByHigherAuth(id){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
     return this.http.get(this.getReimRecordsByHigherAuthUrl+id,httpOptionsPlain);
  }


  updateReportStatus(){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      // responseType: 'text' as 'json'
    };
     return this.http.get(this.updateReportStatusUrl,httpOptionsPlain);
  }

 updateReimbursement(reimbursement){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
     return this.http.put(this.updateReimUrl,reimbursement,httpOptionsPlain);
  }

  reimUpdate(reimbursement){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
      return this.http.put(this.reimUpdatekUrl,reimbursement,httpOptionsPlain)
  }

  
  addFile(formData,id){
    console.log("Id --->",id);
    
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
    return this.http.post(this.fileUploadUrl+id, formData,httpOptionsPlain)
  }




  
  
}
