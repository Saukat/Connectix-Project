import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
// import { environment } from '../appEnvironment/environment';
import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';
import { SalaryStructure } from '../models/salary-structure';
import { PayrollDetailsService } from './payroll-details.service';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class SalaryStructureService {

  
  //  saveSalUrl="http://192.168.1.25:5858/connectix/salary/salSave";
  saveSalUrl=environment.api_url+"/salary/salSave";

  //  getAllSalUrl="http://192.168.1.25:5858/connectix/salary/all";
   getAllSalUrl=environment.api_url+"/salary/all";

  
  //  updateSalUrl="http://192.168.1.25:5858/connectix/salary/update";
   updateSalUrl=environment.api_url+"/salary/update";



  editSalaryStructureData;
  constructor(private location:Location,
    private _adminService:ConAdminLoginService,
    private payrollService:PayrollDetailsService,private http:HttpClient) { }


  //save salary structure data into db
  saveSalaryStructureDetails(salaryStructure:SalaryStructure){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
     return this.http.post(this.saveSalUrl,salaryStructure,httpOptionsPlain);
  }

  getAllEmpSalStructure(){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
    };
    return this.http.get(this.getAllSalUrl,httpOptionsPlain)
  }

  //getAll data
  // allDataOfEmpSal;
  // getAllEmpSalStructure(id){
  //   return this.http.get(this.getAllSalUrl).pipe(
  //     map(res=>{
  //       if (res==null) {
  //         console.log(" salNo Data")
  //         return null;
  //       }if(res[0].id !== id){
  //         console.log(" salaryDetails Id not Matched")
  //            return null;
  //       }else{
  //         let oneRecords= [res].filter(data=>{
  //           return data[0].id===id
  //          })
  //           console.log("One salaryDetailsl",oneRecords)
     
  //           return oneRecords;
  //       }
  //     })
  //   )
  // }

 //update sal records
 updateEmpSalrecords(salRecords){
  let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
  return this.http.put(this.updateSalUrl,salRecords,httpOptionsPlain);
 }










  saveSalaryStructure(salaryDetails){
     //SEND TO PAYROLL SERVICE
     

    let allSalaryStructureDetails=[]
  if(localStorage.getItem('SalaryStructureDetails')){

     allSalaryStructureDetails=JSON.parse(localStorage.getItem('SalaryStructureDetails'))
     
     allSalaryStructureDetails=[salaryDetails, ...allSalaryStructureDetails];

// allSalaryStructureDetails.map(s=>{
//              s['addition']="N/A";
//              s['deduction']="N/A";
//              s['reimbursements']="N/A";
//              s['remark']="Salary process for this month";

//              return s;
//         })
//         // save data of payroll
//         console.log("Updatesss=>",allSalaryStructureDetails);
        // this.payrollService.savePayrollDetails(this.payrollAllData);
    //  allSalaryStructureDetails=[salaryDetails, ...allSalaryStructureDetails];
      



  }else{
    allSalaryStructureDetails=[salaryDetails];
  }
  localStorage.setItem('SalaryStructureDetails',JSON.stringify(allSalaryStructureDetails));
 
      //SEND TO PAYROLL SERVICE
      this.payrollService.savePayrollDetails(salaryDetails);
    //  this.payrollService.savePayrollDetails(allSalaryStructureDetails);
  //this.router.navigate(['dashboard','allEmp']);
  this.location.back();

}

  //get Records from local storage
  getOnesalaryDetails(id){
    let salaryDetails=JSON.parse(localStorage.getItem('SalaryStructureDetails'));
   // console.log("All FsalaryDetails info",salaryDetails);
  //  console.log("salaryDetailsr Data=>",salaryDetails);
    
    
      if (salaryDetails==null) {
      //  console.log(" FsalaryDetailsl No Data")
        return null;
      }if(salaryDetails[0].id !== id){
       // console.log(" salaryDetails Id not Matched")
           return null;
      }else{
        let oneRecords= salaryDetails.filter(data=>{
          return data.id===id
         })
       //   console.log("One salaryDetailsl",oneRecords)
   
          return oneRecords;
      }
  }
}
