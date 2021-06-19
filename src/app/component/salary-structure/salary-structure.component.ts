import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SalaryStructureService } from 'src/app/appService/salary-structure.service';
import { SalaryStructure } from 'src/app/models/salary-structure';

@Component({
  selector: 'app-salary-structure',
  templateUrl: './salary-structure.component.html',
  styleUrls: ['./salary-structure.component.css']
})

export class SalaryStructureComponent implements OnInit {

  salaryStructure:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private location:Location,private route:ActivatedRoute,private salaryService:SalaryStructureService) { 
    this.salaryStructure=fb.group({  //group the whole data into formLogicalName object
     
      id:[''],
      basic:['',Validators.required],
      hra:['',Validators.required],
      conveyanceAllowance:['',Validators.required],
      otherAllowance:['',Validators.required],
      grossPay:['',Validators.required],
      employeeEpf:['',Validators.required],
      employeeESI:['',Validators.required],
      netSalary:['',Validators.required],
      employerEpf:['',Validators.required],
      employerESI:['',Validators.required],
      totalCostToCompany:['',Validators.required],
     
   })
  }

  id
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  //getting from single-emp-details
    console.log("id otherInfo ====>",this.id)  
  }


  basicSalary;
  Hra;
  cAlloance;
  ovAlloance;
  grossPay;

  empEpf;
  empEsi;

  netPay

  emprEpf;
  emprEsi;

  totalCompanyCost;
 //Basic salary
 basicSalryCalculation(bs:any){
  this.basicSalary=bs.target.value;
   console.log("baic",this.basicSalary);

   //Hra value
   this.Hra=Math.round((this.basicSalary/100)*40);
   console.log("HRA round=>",Math.round(this.Hra));

   //other Variable Allowance
   this.cAlloance=Math.round(800.00);
   // myNumber.toPrecision(4); 
   this.ovAlloance=Math.round((this.basicSalary/100)*99);
   // this.ovAlloance=ova.toFixed(2)
   // console.log("ova=>",this.ovAlloance);

   //Gross pay
   
   this.grossPay=Math.round(parseFloat(this.basicSalary) + parseFloat(this.cAlloance) + parseFloat(this.ovAlloance) + parseFloat(this.Hra));
   console.log(this.grossPay);

   //employee's contribution EPF 12% of basic
   this.empEpf=Math.round((this.basicSalary/100)*12);

   //Employee contribution of ESI 0.75% of basic
    if(this.grossPay<=21000.00){
      console.log("ESI Of Employee");
      
       this.empEsi=Math.round((this.grossPay/100)*0.75);
       
    }else{
      console.log("000000");
      
     this.empEsi=0.0;
    }

    //Net Pay(grossPay-empEpf-empEsi)
    this.netPay=Math.round(parseFloat(this.grossPay) - parseFloat(this.empEpf) - parseFloat(this.empEsi));
    
   //Employer's contribution to Epf(13.10% of basic)
   this.emprEpf=Math.round((this.basicSalary/100)*13.10);

    
   //Employer's contribution to Epf(13.10% of basic)
     if(this.grossPay<=21000){
        this.emprEsi=Math.round((this.grossPay/100)*3.25);
     }else{
       this.emprEsi=0.0

     }

   //Total cost to companay(gross+emprEpf+emprEsi)
    let total=Math.round(parseFloat(this.grossPay) + parseFloat(this.emprEpf) + parseFloat(this.emprEsi));
   //  let total=parseFloat(total1).toFixed(2) 
    this.totalCompanyCost=Math.round(total);

   }



  onsalaryStructureForm(){
    console.log("data..",this.salaryStructure.value)
   // console.log(this.salaryStructure.value);


    let id=this.salaryStructure.value.id;
    
    
    let basic=this.salaryStructure.value.basic;
    let hra=this.salaryStructure.value.hra;
    let conveyanceAllowance=this.salaryStructure.value.conveyanceAllowance;
    let otherAllowance=this.salaryStructure.value.otherAllowance;
    let grossPay=this.salaryStructure.value.grossPay;
    let employeeEpf=this.salaryStructure.value.employeeEpf;
    let employeeESI=this.salaryStructure.value.employeeESI;
    let netSalary=this.salaryStructure.value.netSalary;
    let employerESI=this.salaryStructure.value.employerESI;
    let employerEpf=this.salaryStructure.value.employerEpf;
    let totalCostToCompany=this.salaryStructure.value.totalCostToCompany;


    let salaryStructure:SalaryStructure={
      id,
      basic,
      hra,
      conveyanceAllowance,
      otherAllowance,
      grossPay,
      employeeEpf,
      employeeESI,
      netSalary,
      employerESI,
      employerEpf,
      totalCostToCompany
   }
  this.saveSalaryStructure(salaryStructure);
   return salaryStructure;
}

  
  saveSalaryStructure(salaryStructure){

    console.log("salaryStructure Data",salaryStructure);
    this.salaryService.saveSalaryStructureDetails(salaryStructure).subscribe(
      response=>{
          console.log("Sucess"+response);
          this.location.back();
      },error=>{
          console.log("error")
      }
    )
   // this.salaryService.saveSalaryStructure(salaryStructure); //send data to saveProvidentFund service class
  }

}
