
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AttendanceService } from 'src/app/appService/attendance.service';
import { EmployeeService } from 'src/app/appService/employee.service';
import { FiscalYearService } from 'src/app/appService/fiscal-year.service';
import { OtherInfoService } from 'src/app/appService/other-info.service';
import { PaymentService } from 'src/app/appService/payment.service';
import { ProvidentFundService } from 'src/app/appService/provident-fund.service';

import { SalaryStructureService } from 'src/app/appService/salary-structure.service';

@Component({
  selector: 'app-single-emp-details',
  templateUrl: './single-emp-details.component.html',
  styleUrls: ['./single-emp-details.component.css']
})
export class SingleEmpDetailsComponent implements OnInit {
   id;
   singleEmpData;

   //getOne records of employee sign up
   empArr_StringData;//single empDetails
   allData;
   
   //otherInfo Single records
    otherInfoSingleRecords;
   salDetails;//salary_details
  
   //OtherInfo get Value
   isRecords;
   nullRecords;

   //provident Fund Data
   providentFundSingleData
   isProvidentFund;

   //payment info
   paymentInfoSingleData
   isPayment

   //fiscal Yaer 
   fiscalYearSingleData
   isFiscalYear

   //Salary Stucture
   salarySingleData
   isSalayStructure


   //attendance
   isAttendance

   empSalDetailsForm;//formLogicalName
  constructor(private route:ActivatedRoute,
    private empService:EmployeeService,
    private router:Router,
    private fb:FormBuilder,
    private otherInfoService:OtherInfoService,
    private providentFundService:ProvidentFundService,
    private paymentService:PaymentService,
    private fiscalYearService:FiscalYearService,
    private salStructureService:SalaryStructureService,
    private attendanceService:AttendanceService
    ) {
    
   }
   adminIdAndName;
  authorityData;
  attendance;
  ngOnInit() {

    this.id = this.route.snapshot.params['id'];  //getting from all-employee-component
  
     
     this.empService.getSingleEmployee(this.id).subscribe(
       response=>{
        this.empArr_StringData=response;
        //  console.log("Employee id",response.employeeId);
         
        this.empService.getOneAdminData(this.empArr_StringData.reportHighAuth).subscribe(
          response=>{
            this.adminIdAndName=response;
            this.authorityData=this.adminIdAndName.email;
              // console.log("plo 1st data",response)
          },error=>{

            this.empService.getSingleEmployee(this.empArr_StringData.reportHighAuth).subscribe(
              response=>{
                this.adminIdAndName=response;
                this.authorityData=this.adminIdAndName.name;
                  // console.log("plo emmployee",response)
              },error=>{
                 
              }
            )
             
          }
        )
       },error=>{
            console.log("error");
       }
     )
    



     let empSal=this.salStructureService.getAllEmpSalStructure();
      
        
     let salData;
     let pm= empSal.forEach(res=>{
     
         salData=res;
         
        let actualdata= salData.filter(x => {
           return x.id===this.id;
           
         });
        //  console.log("Actulal sal",actualdata)
         if(actualdata[0].id===this.id){
             
           this.isSalayStructure=actualdata;
           console.log("Salary structure Null 1")
         }else{
           this.isSalayStructure="Null"
           console.log("Salary structure Null")
         }
        
        
        return res;
     }).catch(err=>{
       this.isSalayStructure=0;
        console.log(" salary error err");
 
     })


  /*  let p= this.salStructureService.getAllEmpSalStructure(this.id);
       p.subscribe(
         res=>{
           this.salarySingleData=res;
             console.log("data",this.salarySingleData)
             if(this.salarySingleData=== null){
      
                this.isSalayStructure="Null";
                console.log("Null data print of salarySingleData",this.isSalayStructure)
              }
              else if (this.salarySingleData.length== 0) {
                  console.log("NOOOO DATATA Found")
                  this.isSalayStructure="Null";
                }
                else{
                this.isSalayStructure=this.salarySingleData;
                console.log("Id based Data isSalayStructure ",this.isSalayStructure);

                }
         },error=>{
              console.log("error of sal")
         }
       )*/










       //console.log("id",p)
    
    //get One Records of Salary Structure
    
    // this.salStructureService.getAllEmpSalStructure().subscribe(
    //   response=>{
    //        console.log("data of ",response)
    //       console.log(this.id)
    //       let oneRecords=response;
    //       if(response==[]){
    //           console.log("data of empty")
    //       }else{
    //         console.log("one records")
    //        this.isSalayStructure=[response].filter(data=>{
    //         return data[0].id===this.id
    //        })
    //       }
    //        console.log("data of all",this.isSalayStructure)
    //   },(error:HttpErrorResponse)=>{
    //     this.nullRecords="Null";
    //     console.log(this.isSalayStructure)
    //        console.log("error",error);
    //   }
    // )

    // this.salStructureService.getOneRecordsOfSal();


    console.log("data tr",this.salarySingleData);
    //get One Records of Salary Structure
   
  
    // if(this.salarySingleData== "Null"){
      
    //  this.isSalayStructure="Null";
    //  console.log("Null data print of salarySingleData",this.isSalayStructure)
    // }else if (this.salarySingleData.length== 0) {
    //   console.log("NOOOO DATATA Found")
    //   this.isSalayStructure="Null";
    // }
    // else{
    //  this.isSalayStructure=this.salarySingleData;
    // console.log("Id based Data isSalayStructure ",this.isSalayStructure);

    // }











    
    //get One Records of Salary Structure
  /*  this.salarySingleData=this.salStructureService.getOnesalaryDetails(this.id);
  
    if(this.salarySingleData== null){
      
     this.isSalayStructure="Null";
     console.log("Null data print of salarySingleData",this.isFiscalYear)
    }else if (this.salarySingleData.length== 0) {
      console.log("NOOOO DATATA Found")
      this.isSalayStructure="Null";
    }
    else{
     this.isSalayStructure=this.salarySingleData;
    console.log("Id based Data isSalayStructure ",this.isSalayStructure);

    }*/





    //get One Records of Fiscal Yaer Info
    // this.fiscalYearSingleData=this.fiscalYearService.getOneFiscalYear(this.id);
  
    // if(this.fiscalYearSingleData== null){
      
    //  this.isFiscalYear="Null";
    
    // }else if (this.fiscalYearSingleData.length== 0) {
  
    //   this.isFiscalYear="Null";
    // }
    // else{
    //  this.isFiscalYear=this.fiscalYearSingleData
 
    // }

    

    /* Payment data manipulation*/ 
    let pn=this.paymentService.getAllPayment()
      
    
    let data;
    let pk= pn.forEach(res=>{
        data=res;
        
       let actualdata= data.filter(x => {
          // console.log("filter data",x);
          // console.log("log data",x.id===this.id);
         
          return x.id===this.id;
          
        });
        // console.log("Actulal",actualdata)
        if(actualdata[0].id===this.id){
            
          this.isPayment=actualdata;
          //  console.log("true data")
        }else{
          this.isPayment="Null"
          //  console.log("false data")
        }
       
      //  console.log("data of foreach",data);
       return res;
    }).catch(err=>{
      this.isPayment="Null";
      //  console.log("err");

    })
     


    //attendance
     
    let getAllAttendance=this.attendanceService.getAllAttendance()
    let attendanceData;
    let pks= getAllAttendance.forEach(res=>{
        attendanceData=res;
        
       let actualdata= attendanceData.filter(x => {
          // console.log("filter data att",x);
          // console.log("log data of attn",x.attendEmpId===this.id);
         
          return x.attendEmpId===this.id;
          
        });

        // console.log("Actulal att",actualdata)
        if(actualdata[0].attendEmpId===this.id){
            
          this.isAttendance=actualdata;
          //  console.log("true data")
        }else{
          this.isAttendance="Null"
          //  console.log("false data attendance")
        }
       
      //  console.log("data of foreach",data);
       return res;
    }).catch(err=>{
      this.isAttendance="Null";
      //  console.log("err");

    })


    // this.attendanceService.getSingleEmpAttendance(response.employeeId).subscribe(
    //   response=>{
    //     this.attendance=response;
    //     console.log("Data of employee",response);
        
    //   },error=>{
    //     console.log("error",error);
        
    //   }
    // )








    //  let singleData= data.map(x=>{
    //  return x.id==this.id;
    // });
    // console.log("single Data",singleData)
    
    
    

    //get One Records of Payment Info
    // this.paymentInfoSingleData=this.paymentService.getOneEmpPaymentInfo(this.id);
    // if(this.paymentInfoSingleData== null){
      
    //  this.isPayment="Null";
    // }else if (this.paymentInfoSingleData.length== 0) {
    //   console.log("NOOOO DATATA Found")
    //   this.isPayment="Null";
    // }
    // else{
    //  this.isPayment=this.paymentInfoSingleData
    // }



   
    //get One Records of Provident fund Based on Id
        // this.providentFundSingleData=this.providentFundService.getOneEmpProvidentFund(this.id);
        // if(this.providentFundSingleData== null){
          
        //  this.isProvidentFund="Null";
        // }else if (this.providentFundSingleData.length== 0) {
        //   this.isProvidentFund="Null";
        // }
        // else{
        //  this.isProvidentFund=this.providentFundSingleData
   
        // }


  // debugger;
   //get one records of other info based on Id
    // this.otherInfoSingleRecords=this.otherInfoService.getAllEmpOtherInfo(this.id);
  
    
    //    if(this.otherInfoSingleRecords == null){
          
    //      this.isRecords="Null";
     
    //    }else if (this.otherInfoSingleRecords.length== 0) {
    
    //     this.isRecords="Null";
    //   }
    //    else{
    //     this.isRecords=this.otherInfoSingleRecords
    
    //    }




       
  }
 
  //Edit Employee Details
  EditEmployee(editData){
      this.empService.editData = editData;  //asign edit emp data to editData object
      this.router.navigate(['dashboard','update']);
  }



  //Employee Annual Salary Details
  // onEmployeeSalDetails(){
  //   // console.log(this.empSalDetailsForm.value);
  //    this.salService.getAllLeaveAndAttendanceDetails(this.empSalDetailsForm.value);
  // }
  

  //Edit Salary Struture
  EditSalryStructure(salaryDetails){
   console.log("salaryDetails Data ",salaryDetails)

    if(salaryDetails==0){
      //  console.log("null salaryDetails Data")
        this.router.navigate(['dashboard','salaryStructure',this.id]);
   }else{
     //console.log("Data salaryDetails",salaryDetails)
     this.salStructureService.editSalaryStructureData=salaryDetails;
     this.router.navigate(['dashboard','editsalaryStructure']);
       
   }
  }



  //edit Fiscal Yaer Data
EditFiscalYear(fiscalYearData){
 // console.log("fiscalYearData Data ",fiscalYearData)

  if(fiscalYearData=== "Null"){
    //  console.log("null fiscalYearData Data")
      this.router.navigate(['dashboard','fiscalYear',this.id]);
 }else{
   //console.log("Data fiscalYearData",fiscalYearData)
  //  this.fiscalYearService.editFiscalYearData=fiscalYearData;
  //  this.router.navigate(['dashboard','editFiscalYear']);
     
 }
}








//edit paymentData fund Data
EditPaymentInfo(paymentData){
    //  console.log("payment Data ",paymentData)

     if(paymentData=== "Null"){
      // console.log("null payment Data")
         this.router.navigate(['dashboard','paymentInfo',this.id]);
    }else{
      // console.log("Data",paymentData)
      this.paymentService.editPaymentInfoData=paymentData;
      this.router.navigate(['dashboard','editPaymentInfo']);
          // console.log("Update data=>",infoDataToUpdate)
    }
  }

  EditLeave(){
    
  }




  //edit Provident fund Data
  EditProvidentFund(providentFund){
    //  console.log("provident fund",providentFund)

     if(providentFund=== "Null"){
      // console.log("null Data")
         this.router.navigate(['dashboard','providentFund',this.id]);
    }else{
      // console.log("Data",providentFund)
      this.providentFundService.editProvidentData=providentFund;
      this.router.navigate(['dashboard','EditprovidentFund']);
          // console.log("Update data=>",infoDataToUpdate)
    }
  }








  //Edit Other Information
  EditOtherInfo(otherInfoData){
        // console.log("otherInfo=>",this.id);
        // console.log("Data",otherInfoData);
        
        if(otherInfoData=== "Null"){
          // console.log("null Data")
             this.router.navigate(['dashboard','otherInfo',this.id]);
        }else{
          // console.log("Data",otherInfoData)
          this.otherInfoService.editOtherInfoData=otherInfoData;
          this.router.navigate(['dashboard','editOtherInfo']);
              // console.log("Update data=>",infoDataToUpdate)
        }
        // this.empService.editData = editData;
      // this.router.navigate(['dashboard','otherInfo',id]);
  }

  //attendance
  editAttendance(attendData){

    // console.log("otherInfo=>",this.id);
        // console.log("Data",attendData);
        
        if(attendData=== "Null"){
          //  console.log("null Data")
             this.router.navigate(['dashboard','attendance',this.id]);
        }else{
          // console.log("Data",attendData)
             this.attendanceService.getAttendanceDataForEdit=attendData;
          this.router.navigate(['dashboard','editAttendance']);
              // console.log("Update data=>",infoDataToUpdate)
        }
      // console.log("Attendance",attendData);
 
      // this.router.navigate(['dashboard','editAttendance']);
  }


  
}
