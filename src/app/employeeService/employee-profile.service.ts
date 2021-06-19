import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
// import { environment } from '../appEnvironment/environment';
import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class EmployeeProfileService {

//   email=new Subject<any>();
  id;
  oneRecordsOfEmp;

//   getAllEmpUrl="http://192.168.1.25:5858/connectix/employee/allEmp";
getAllEmpUrl=environment.api_url+"/employee/allEmp";


//   getAllSalUrl="http://192.168.1.25:5858/connectix/salary/all";
getAllSalUrl=environment.api_url+"/salary/all";

//   getAllPaymentUrl="http://192.168.1.25:5858/connectix/payment/all";
  getAllPaymentUrl=environment.api_url+"/payment/all";

//   getAllEmpPayrollUrl="http://192.168.1.25:5858/connectix/payroll/all";
// getAllEmpPayrollUrl=environment.api_url+"/payroll/all";
getAllEmpPayrollUrl=environment.api_url+"/payroll/previousMonthRecords";

calendarbasedPaySlipUrl=environment.api_url+"/payroll/calendarWiseRecords/";


// currentMonthRecords


  constructor(private http:HttpClient,private _adminService:ConAdminLoginService) { }


   getOneRecordsUsingId(){
      let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }; 
      return this.http.get(this.getAllEmpUrl,httpOptionsPlain);
   }
   

   //get Salary structure
   getOneRecordsOfSalStructUsingId(){
      let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }; 
      return this.http.get(this.getAllSalUrl,httpOptionsPlain);
   }


   //getAll data
   getAllPayment(){
      let token=this._adminService.getToken();
   
      const httpOptionsPlain = {
        headers: new HttpHeaders({
          'Authorization': token
        })
      }; 
      return this.http.get(this.getAllPaymentUrl,httpOptionsPlain)
   }

   //get remark from payroll
   getAllEmpPayrollData(){
      let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }; 
      return this.http.get(this.getAllEmpPayrollUrl,httpOptionsPlain);
    }

    //get Caledarbased records
    getMonthYear;//send from dashboard dropdown
    getCaledarBasedpayrollRecords(monthyear,id){
      let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    }; 
      return this.http.get(this.calendarbasedPaySlipUrl+monthyear+"/"+id,httpOptionsPlain);
    }


















  getAllDataOfEmployeeReg(email){
     let empData=JSON.parse(localStorage.getItem('EmployeesRegisterData'));

     let singleEmp=empData.filter((data,index)=>{
      return data.email==email
         })
      console.log("one Records",singleEmp)

      return singleEmp;
   
  }

  //get single employee salary data
  getSingleEmpSalaryData(id){
    let empSalData=JSON.parse(localStorage.getItem('SalaryStructureDetails'));
       console.log("sallll",empSalData)
    let singleEmp=empSalData.filter((data,index)=>{
     return data.id==id
        })
     console.log("one Records",singleEmp)

     return singleEmp;
  
 }

//get single employee payment information
getSingleEmpPaymentInfo(id){
  let empSalData=JSON.parse(localStorage.getItem('PaymentInfoDetails'));
     console.log("sallll",empSalData)
  let singleEmp=empSalData.filter((data,index)=>{
   return data.id==id
      })
   console.log("one Records",singleEmp)

   return singleEmp;

}

//get single employee Payroll
getSingleEmpPayroll(id){
  let empPayroll=JSON.parse(localStorage.getItem('Payrolldetails'));
     console.log("sallll",empPayroll)
  let singleEmp=empPayroll.filter((data,index)=>{
   return data.id==id
      })
   console.log("one Records",singleEmp)

   return singleEmp;

}

}
