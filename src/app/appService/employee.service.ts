import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { Employee } from '../models/employee';
// import {environment} from '../appEnvironment/environment';
import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  

  // saveEmplUrl="http://192.168.1.25:5858/connectix/employee/empReg";
  saveEmplUrl=environment.api_url+"/employee/empReg";

  // getAllEmpUrl="http://192.168.1.25:5858/connectix/employee/allEmp";
  getAllEmpUrl=environment.api_url+"/employee/allEmp";

  // getOneEmpUrl="http://192.168.1.25:5858/connectix/employee/one/";
  getOneEmpUrl=environment.api_url+"/employee/one/";
  
  // updateEmpUrl="http://192.168.1.25:5858/connectix/employee/update";
  updateEmpUrl=environment.api_url+"/employee/update";

  editProfilePhotoUrl=environment.api_url+"/employee/updatePhoto";

   adminOneRecordsURL=environment.api_url+"/admin/one/";
//admin data
getAllAdminUrl=environment.api_url+"/admin/all";
 //forgot password
forgotPasswordUrl=environment.api_url+"/email/sendEmailForForgotPassword";

  editData;
  oneRecords;
  ApiURL={}
  //singleObj;

  constructor(private location:Location,private router:Router,private http:HttpClient,private _adminService:ConAdminLoginService) { }


   //Add to local Storage
    ids=1;
    id=1;
   addEmployee(employee:Employee){
     console.log("register Data:",employee)
    let employees=[]
    if(localStorage.getItem('EmployeesRegisterData')){
       employees=JSON.parse(localStorage.getItem('EmployeesRegisterData'))
    
       console.log("employees",employees)

      this.id=employees.length;
      this.id++;
    
      //Asign id key and value into employee object
       employee["id"]=this.id;
       employees=[employee, ...employees];
    }else{
      employee["id"]=this.id;
      employees=[employee];
    }
    localStorage.setItem('EmployeesRegisterData',JSON.stringify(employees))
   this.router.navigate(['dashboard','allEmp']);
 
}

//store into mongodb
saveEmployee(employee:Employee){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
      return this.http.post(this.saveEmplUrl,employee,httpOptionsPlain)
}


//getEmployee Data from MongoDb
getAllEmpData(){
  // console.log("data");
  
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
  };
   return this.http.get(this.getAllEmpUrl,httpOptionsPlain);
}

//getSingleEmployee form Db
getSingleEmployee(id:any){
  
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
  };
  return this.http.get(this.getOneEmpUrl+id,httpOptionsPlain)
  .pipe(map((data: any) => data), 
  catchError(error => { return throwError('Its a Trap!')})
);
}

//update EmpInfo
updateEmployeeInfo(employee){
  let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
       return this.http.put(this.updateEmpUrl,employee,httpOptionsPlain);
}

//update EmpInfo
editProfilePhoto(employee){
  let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
       return this.http.put(this.editProfilePhotoUrl,employee,httpOptionsPlain);
}

//getEmployee Data from MongoDb
getAllAdminData(){
  // console.log("data");
  
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
  };
   return this.http.get(this.getAllAdminUrl,httpOptionsPlain);
}

//getEmployee Data from MongoDb
getOneAdminData(id:any){

  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
  };
   return this.http.get(this.adminOneRecordsURL+id,httpOptionsPlain);
}

//store into mongodb
forgotPassword(email){
  // let token=this._adminService.getToken();
 
  const httpOptionsPlain = {
    // headers: new HttpHeaders({
    //   'Authorization': token
    // }),
    responseType: 'text' as 'json'
  };
    return this.http.post(this.forgotPasswordUrl,email,httpOptionsPlain)
}





//getSingle Employee details <:Observable<Employee>>
 oneData;
 empSingledata;
getOneEmpDetails(id:any){
  console.log("service Id:"+id);
 let allEmp=JSON.parse(localStorage.getItem('EmployeesRegisterData'));
 console.log("All Data:",allEmp);

    let singleEmp=allEmp.filter((data,index)=>{
       return data.id==id
    })
    console.log("PPP",singleEmp)

    return singleEmp;
   
 
 }

 



}
