import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
// import { environment } from '../appEnvironment/environment';
import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class PayrollDetailsService {
  // getAllEmpPayrollUrl="http://192.168.1.25:5858/connectix/payroll/all";
  // getAllEmpPayrollUrl=environment.api_url+"/payroll/all";
   getAllEmpPayrollUrl=environment.api_url+"/payroll/currentMonthRecords";


  // updateEmpPayrollUrl="http://192.168.1.25:5858/connectix/payroll/update";
  updateEmpPayrollUrl=environment.api_url+"/payroll/update";


  // getAllPayWithAccUrl="http://192.168.1.25:5858/connectix/payroll/payWithAccNo";
  getAllPayWithAccUrl=environment.api_url+"/payroll/payWithAccNo";

  insertCurrentDateRecordsUrl=environment.api_url+"/payroll/saveCurrentPayroll"

  calendarWiseRecordsUrl=environment.api_url+"/payroll/salaryMonth/"

  

  

  payrollStatusChangesUrl=environment.api_url+"/payroll/process"

  payrollReportBasedonCalenderUrl=environment.api_url+"/payroll/monthWisePayrollReport/"


  constructor(private router:Router,private datePipe:DatePipe,private http:HttpClient,private _adminService:ConAdminLoginService) { }

  insertCurrentDateRecords():Observable<any>{
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    
    return this.http.get<any>(this.insertCurrentDateRecordsUrl,httpOptionsPlain);
  }

  getAllEmpPayrollData(){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      })
    };
    return this.http.get(this.getAllEmpPayrollUrl,httpOptionsPlain);
  }

  //update payment data
  updatePayroll(payroll){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
    
  return this.http.put(this.updateEmpPayrollUrl,payroll,httpOptionsPlain);
 }

 
//Records fetch for show calender wise dropdown
 calendarWiseRecords(id){
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    })
  };
  return this.http.get(this.calendarWiseRecordsUrl+id,httpOptionsPlain);
 }

//status changed
payrollStatusChanges(){
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
    responseType: 'text' as 'json'
  };
  return this.http.get(this.payrollStatusChangesUrl,httpOptionsPlain);
 }


 //payroll Report 
payrollReportBasedonCalender(date){
  
let token=this._adminService.getToken();
   
const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Authorization': token
  }),
  // responseType: 'text' as 'json'
};
return this.http.get(this.payrollReportBasedonCalenderUrl+date,httpOptionsPlain);
}














  

//getPayroll Data with the help of Service
 getPayrollAllData;

 //Save Payment Data
 //get payrollData from salary structure component
 savePayrollDetails(salaryDetails){
    console.log("hlw")

  let salaryData=salaryDetails;
    console.log("Salry Data=>",salaryData)
    

    let empRegInfo=JSON.parse(localStorage.getItem('EmployeesRegisterData'));
     console.log("Nameeeeeeeee",empRegInfo.name);
  let dataOfPayroll=[];
    dataOfPayroll['id']=salaryData.id;
    dataOfPayroll['grossPay']=salaryData.grossPay;

    dataOfPayroll['netSalary']=salaryData.netSalary;

    dataOfPayroll['totalCostToCompany']=salaryData.totalCostToCompany;
    dataOfPayroll['addition']="N/A";
    dataOfPayroll['deduction']="N/A";
    dataOfPayroll['reimbursements']="N/A";
    dataOfPayroll['remark']="Salary process for this month";
    dataOfPayroll['status']="Not Final";
    dataOfPayroll['name']=empRegInfo[0].name

    dataOfPayroll.map(e=>{
      console.log("map data=",e);
      
    })

    console.log("Payrollllllllllll",dataOfPayroll);
    // let t=JSON.stringify(dataOfPayroll);

    let x= Object.assign({},dataOfPayroll);
    console.log("x value",x)
    let payroll=[];
    if(localStorage.getItem('Payrolldetails')){
     payroll=JSON.parse(localStorage.getItem('Payrolldetails'))
    
     payroll=[x, ...payroll];
  }else{
     payroll=[x];
  }
  console.log("data  save=>",payroll)
    localStorage.setItem('Payrolldetails',JSON.stringify(payroll));



  

  
 


  // let payrollData=salaryData.map((element,ind )=> {
  //   console.log(element)
  //   dataOfPayroll['id']=element.id;
  //   dataOfPayroll['grossPay']=element.grossPay;
  //   dataOfPayroll['totalCostToCompany']=element.totalCostToCompany;
  //   return dataOfPayroll
  // });
  //  console.log("Payrollllllllllll",payrollData)

    
  
  // let empRegInfo=JSON.parse(localStorage.getItem('EmployeesRegisterData'));

  // let nameWithPayrollData = payrollData.map(p => {
  //   p['name'] = empRegInfo.find(s =>s.id == p.id).name;
  //   p['addition']="N/A";
  //   p['deduction']="N/A";
  //   p['reimbursements']="N/A";
  //   p['remark']="Salary process for this month";
  //   p['status']="Not Final";
   
  //   return p; 
  //  })
  //  console.log("name with payroll",nameWithPayrollData)






  //  let payrollDatas=nameWithPayrollData.map(s=>{
  //   s['addition']="N/A";
  //   s['deduction']="N/A";
  //   s['reimbursements']="N/A";
  //   s['remark']="Salary process for this month";
  //   s['status']="Not Final";


  //   return s;
  //  })
  //  console.log("nwww",payrollDatas);

   



//    let payroll=[];
//    if(localStorage.getItem('Payrolldetails')){
//     payroll=JSON.parse(localStorage.getItem('Payrolldetails'))
   

//     payroll=[nameWithPayrollData, ...payroll];
//  }else{
//     payroll=[nameWithPayrollData];
//  }
//  console.log("data  save=>",payroll)
//    localStorage.setItem('Payrolldetails',JSON.stringify(payroll));
  




//  for (var i = 0; i < payroll.length; ++i) {
//   if (payroll[i].id === nameWithPayrollData.id) {
//     payroll[i] = nameWithPayrollData;
//     localStorage.setItem('PaymentInfoDetails',JSON.stringify(payroll))
//   }else{
//     console.log("Not Reco")
//   }
// }
// console.log("emp payment Data:",payroll);



  //  JSON.stringify(localStorage.setItem('PayrollNewData',nameWithPayrollData));
  // return nameWithPayrollData;
  //  console.log("All Data=>",payroll)
    // this.router.navigate(['dashboard','payroll']);
  
    // this.location.back();
}



//payroll all Details
  getAllPayrollDetails(){
    // console.log("ALlllllllllll")
    // let allPayementData=JSON.parse(localStorage.getItem('PaymentInfoDetails'));
    // console.log(allPayementData[0].accNo)
  
    let allPayrollData=JSON.parse(localStorage.getItem('Payrolldetails'));
    //  console.log("emp datattat=",allPayrollData)
    // let accWithPayroll = allPayrollData.map(p => {
    //   p['accNo'] = allPayementData.find(s =>s.id == p.id).accNo;
      
    //   return p; 
    //  })
  console.log("getallData",allPayrollData)
    return allPayrollData;
  }




getPayrollDataForTxtPrint(){

  let token=this._adminService.getToken();
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    })
  };
        return this.http.get(this.getAllPayWithAccUrl,httpOptionsPlain);
}




  getDataForPrint(){

  
     let allPayementData=JSON.parse(localStorage.getItem('PaymentInfoDetails'));
    console.log(allPayementData[0].accNo)

    let allPayrollData=JSON.parse(localStorage.getItem('Payrolldetails'));
     console.log("emp datattat=",allPayrollData)

    let accWithPayroll = allPayrollData.map((p,ind) => {
      p['accNo'] = allPayementData.find(s =>s.id == p.id).accNo;
      // console.log("payroll",p);
      return p; 
     })
  // console.log("Tata",accWithPayroll)
  return allPayrollData;
  }


  fhrData=[
      "FHR |15 | 08/03/2020 | Cut-Off | 50021.00| INR | 0006105027372 | 0011^"
  ];

  mdrData=[
    {"MDR":"MDR", "accNo":"006105027372", "p":"570518395","INR":"INR", "ifsc":"ICIC0000011","web":"WEB^"}
  ]


  getDataPrintForFHR(){
     
    return this.fhrData;
  }
  getDataPrintForMDR(){
     
    return this.mdrData;
  }


  date;
  dateOfRemrak(){
    let p=new Date();
    let mon= p.toLocaleString('default', { month: 'long'})
    console.log(mon)
   
    // let mom= mon.toLocaleString('default', { month: 'long'})
     let years=this.datePipe.transform(p, 'yyyy');
     console.log(years);

     this.date='Salary for '.concat(mon,"-",years);
     console.log(this.date)
  }
}
