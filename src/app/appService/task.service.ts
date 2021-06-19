import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  sendTaskUrl=environment.api_url+"/employeeTask/save"
  getAllTaskUrl=environment.api_url+"/employeeTask/getAllSendTask/"
  getAllTaskByEmpUrl=environment.api_url+"/employeeTask/getAllTask/"
  updateTaskUrl=environment.api_url+"/employeeTask/update"
  empTaskUpdatekUrl=environment.api_url+"/employeeTask/updateStatus"

  getEmployeeAddTaskUrl=environment.api_url+"/employeeTask/getAllEmployeeAdd/"

  getAllTaskForAdminUrl=environment.api_url+"/employeeTask/allEmpTask"


  

  getTaskAllData;
  constructor(private http:HttpClient,private _adminService:ConAdminLoginService) { }

  sendTaskToEmployee(employeeTask){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
      return this.http.post(this.sendTaskUrl,employeeTask,httpOptionsPlain)
  }

  getAllSendTaskByHigherId(id){
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    })
  };
  return this.http.get(this.getAllTaskUrl+id,httpOptionsPlain);
}

getAllSendTaskByEmployeeId(id){
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    })
  };
  return this.http.get(this.getAllTaskByEmpUrl+id,httpOptionsPlain);
}



getEmployeeAddTask(id){
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    })
  };
  return this.http.get(this.getEmployeeAddTaskUrl+id,httpOptionsPlain);
}


getAllEmployeeAddTaskForAdmin(){
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    })
  };
  return this.http.get(this.getAllTaskForAdminUrl,httpOptionsPlain);
}

updateTask(employeeTask){
  let token=this._adminService.getToken();
 
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
    responseType: 'text' as 'json'
  };
    return this.http.put(this.updateTaskUrl,employeeTask,httpOptionsPlain)
}

employeeTaskUpdate(employeeTask){
  let token=this._adminService.getToken();
 
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
    responseType: 'text' as 'json'
  };
    return this.http.put(this.empTaskUpdatekUrl,employeeTask,httpOptionsPlain)
}

}
