import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  saveAttendancetUrl=environment.api_url+"/leaveAttendance/save";
  updateAttendanceUrl=environment.api_url+"/leaveAttendance/update";
  updateAttendanceByIdUrl=environment.api_url+"/leaveAttendance/updateLeaveTakenById";
  getOneEmpAttendanceUrl=environment.api_url+"/leaveAttendance/one/";
  getAllAttendancetUrl=environment.api_url+"/leaveAttendance/all";
  

  getAttendanceDataForEdit;
  constructor(private http:HttpClient,private _adminService:ConAdminLoginService) { }



//save salary structure data into db
saveAttendance(attendance){
  let token=this._adminService.getToken();
 
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
    responseType: 'text' as 'json'
  };
   return this.http.post(this.saveAttendancetUrl,attendance,httpOptionsPlain);
}




  getAllAttendance(){
    let token=this._adminService.getToken();
     
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get(this.getAllAttendancetUrl,httpOptionsPlain)
  }
   
  getSingleEmpAttendance(empId:any){
    console.log("Employee attendance",empId);
    
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
    return this.http.get(this.getOneEmpAttendanceUrl+empId,httpOptionsPlain)
  }

  //update EmpInfo
updateAttendance(attendance){
  console.log("data of attend",attendance);
  
  let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
       return this.http.put(this.updateAttendanceUrl,attendance,httpOptionsPlain);
}


 //update EmpInfo
 updateAttendanceById(attendance){
  console.log("data of attend",attendance);
  
  let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
       return this.http.put(this.updateAttendanceByIdUrl,attendance,httpOptionsPlain);
}


}
