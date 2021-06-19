import { DatePipe, Location } from '@angular/common';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PayrollDetailsService } from 'src/app/appService/payroll-details.service';
import { PayrollDetails } from 'src/app/models/payroll-details';

@Component({
  selector: 'app-edit-payroll-details',
  templateUrl: './edit-payroll-details.component.html',
  styleUrls: ['./edit-payroll-details.component.css']
})
export class EditPayrollDetailsComponent implements OnInit {
  payrollData



  editPayrollForm:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private location:Location,private payrollService:PayrollDetailsService,private datePipe:DatePipe) { 
     
    this.editPayrollForm=fb.group({  //group the whole data into formLogicalName object
      payrollId:[''],
      id:[''],
      monthMaxDays:[''],
      name:['',Validators.required],
      totalCostToCompany:['',Validators.required],
      grossPay:['',Validators.required],
      netSalary:['',Validators.required],
      salaryMonth:['',Validators.required],
      addition:['',Validators.required],
      deduction:['',Validators.required],
      paidHoliday:['',Validators.required],
      unPaidHoliday:['',Validators.required],
      reimbursements:['',Validators.required],
      addtionRemark:['',Validators.required],
      deductionRemark:['',Validators.required],
      remark:['',Validators.required],
      status:['',Validators.required],
   })
  }

  //store date 
  date;
  netSal:any=0;
  ngOnInit() {
    console.log("sk saukta alli 1");
    
    this.dateCal();
    this.dateOfRemrak();
   
     
         this.payrollData=this.payrollService.getPayrollAllData;
            
         console.log("Edit Payroll Details=>",this.payrollData)
           console.log("Data=>",this.payrollData.id)

           this.netSal=this.payrollData.netSalary;
           this.monthAndYears=this.payrollData.salaryMonth;
           this.salaryFor=this.payrollData.remark;
         //patch value into form
            this.editPayrollForm.patchValue({
              payrollId:this.payrollData.payrollId,
              id:this.payrollData.id,
              name:this.payrollData.name,
              totalCostToCompany:this.payrollData.totalCostToCompany,
              grossPay:this.payrollData.grossPay,
              netSalary:this.payrollData.netSalary,

              salaryMonth:this.payrollData.salaryMonth,
              addition:this.payrollData.addition,
              deduction:this.payrollData.deduction,
              reimbursements:this.payrollData.reimbursements,
              paidHoliday:this.payrollData.paidHoliday,
              unPaidHoliday:this.payrollData.unPaidHoliday,
              addtionRemark:this.payrollData.addtionRemark,
              deductionRemark:this.payrollData.deductionRemark,
              remark:this.payrollData.remark,
              status:this.payrollData.status

              
              // id:this.payrollData[0][0].id,
              // name:this.payrollData[0][0].name,
              // totalCostToCompany:this.payrollData[0][0].totalCostToCompany,
              // grossPay:this.payrollData[0][0].grossPay,
              // addition:this.payrollData[0][0].addition,
              // deduction:this.payrollData[0][0].deduction,
              // reimbursements:this.payrollData[0][0].reimbursements,
              // remark:this.payrollData[0][0].remark,
              // status:this.payrollData[0][0].status
          })
         



  }

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

   dedu;
   onDbClickForAddition(data){
    let addValue=0;
    addValue=parseFloat(data.target.value)//100

    if(isNaN(addValue)){
      addValue=0;
    }
    
    let netSalary=parseFloat(this.payrollData.netSalary);//10060

    this.netSal=netSalary;
    // console.log("NetSalary",netSalary);
    // console.log("data",addValue);

    this.netSal=netSalary+addValue;//11060
      this.dedu=this.netSal
    // console.log("Net Salary",this.netSal);  
    // console.log("Net Salary",this.netSal);    
  }
 
  adj;
  // sub;
  onDbClickForDeduction(data:any){
    console.log("nea",data);
    let deductionValue=0;
    deductionValue=parseFloat(data.target.value)//10
   console.log("float",deductionValue);

   
    if(isNaN(deductionValue)){
      
      deductionValue=0;
    }
    
    
    else if(isNaN(this.dedu)){
      let netSalary=parseFloat(this.payrollData.netSalary);//1060
      this.netSal= netSalary-deductionValue;
    
      // this.sub=this.netSal
    }else{
       this.netSal= this.dedu-deductionValue;
       this.adj=this.netSal;
      //  console.log("Net Salary",this.netSal); 
    }
  }

  onDbClickForAdjustments(data){
   
    let adjustment=0;   
     adjustment=parseFloat(data.target.value);
    if(isNaN(adjustment)){
      adjustment=0;
    }else if(isNaN(this.adj)){
      let netSalary=parseFloat(this.payrollData.netSalary);
      this.netSal= netSalary-adjustment;
    }else{

    
    // let netSalary=parseFloat(this.payrollData.netSalary);
    // this.netSal=netSalary;
    // console.log("NetSalary",netSalary);

    this.netSal= this.adj-adjustment;
    console.log("data",this.netSal);
    }
    
  }

  numberOfDays;
dateCal(){
  var now = new Date();
  this.numberOfDays =new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();

}
  
  onEditPayrollForm(){
      
    // console.log("payroll salary data",this.payrollData)
    console.log("payroll salary data",this.editPayrollForm.value.salaryMonth)

    this.payrollService.updatePayroll(this.editPayrollForm.value).subscribe(
       res=>{
           console.log("Updated successfully",res)
           this.location.back();
       },error=>{
           console.log("error")
       }
     )



  }

  datepicker(date){
    console.log("date",date.target.value)
  }
  
  months;
  flag=false;
  monthAndYears;
  salaryFor;
  alerts;
  monthFun(month){
    this.months=month.target.value;
    console.log("years",this.years);
    if(this.years===undefined){
      this.flag=true;
      this.alerts="Please Fill Year";
      // alert("Please Fill Year")
    }else{
      this.monthAndYears=this.months+"-"+this.years;
      this.salaryFor="Salary For ".concat(this.monthAndYears);
      console.log("1",this.monthAndYears)
      this.flag=false;
    }
  }
years;
  yearFun(year){
    this.years=year.target.value;
    if(this.months===undefined){
      this.flag=true;
      this.alerts="Please Fill Month";
      // alert("Please Fill Month")
    }else{
      console.log("MOnth",this.months+"Years",this.years)
      this.monthAndYears=this.months+"-"+this.years;
      this.salaryFor="Salary For ".concat(this.monthAndYears);
      console.log("2",this.monthAndYears);
      this.flag=false;
    }
  }

   

}
