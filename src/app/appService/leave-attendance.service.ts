import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class LeaveAttendanceService {
     //save leave data
saveLeaveUrl=environment.api_url+"/leave/save";
viewLeaveUrl=environment.api_url+"/leave/one/";
leaveApproveUrl=environment.api_url+"/leave/approve/";
allLeaveRecordsUrl=environment.api_url+"/leave/allLeaveRecords";
substituteForLeavelUrl=environment.api_url+"/leave/substitute/";          
updateLeaveApprovalUrl=environment.api_url+"/leave/updateStatus";
updateSubstituteRemarkUrl=environment.api_url+"/leave/updateSubstituteRemak";


singleLeaveView;
singleDataForApproval;
singleDataFOrSubstitute;
adminSingleApproval;
  constructor(private http:HttpClient,private _adminService:ConAdminLoginService) { }

  //store into mongodb
saveLeaveInfo(leave){
  let token=this._adminService.getToken();
 console.log("leave data=>",leave);
 
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
    responseType: 'text' as 'json'
  };
    return this.http.post(this.saveLeaveUrl,leave,httpOptionsPlain)
  }

  //get all records for admin dashboard
  allLeaveRecordsData(){
  
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
  };
  return this.http.get(this.allLeaveRecordsUrl,httpOptionsPlain);
}

//getSingleEmployee  leave form Db
getSingleEmployeeLeave(id:any){
  
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
  };
  return this.http.get(this.viewLeaveUrl+id,httpOptionsPlain);
}

//getSingleEmployee  leave form Db
leaveApproveAllData(id:any){
  
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
  };
  return this.http.get(this.leaveApproveUrl+id,httpOptionsPlain);
}

//getSingleEmployee  leave form Db
substituteforLeaveAllData(id:any){
  
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
  };
  return this.http.get(this.substituteForLeavelUrl+id,httpOptionsPlain);
}

//updateApprovalData;
  updateSubstituteRemark(leave){
    let token=this._adminService.getToken();
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
      return this.http.put(this.updateSubstituteRemarkUrl,leave,httpOptionsPlain)
    }

//updateApprovalData;
  updateStatusAndRemarkOfHigherAuth(leave){
    let token=this._adminService.getToken();
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
      return this.http.put(this.updateLeaveApprovalUrl,leave,httpOptionsPlain)
    }



}
