import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalaryStructureService } from 'src/app/appService/salary-structure.service';

@Component({
  selector: 'app-edit-salary-structure',
  templateUrl: './edit-salary-structure.component.html',
  styleUrls: ['./edit-salary-structure.component.css']
})
export class EditSalaryStructureComponent implements OnInit {

  editSalaryStructure:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private location:Location,private route:ActivatedRoute,private router:Router,private salaryService:SalaryStructureService) { 
    this.editSalaryStructure=fb.group({  //group the whole data into formLogicalName object
      saId:[''],
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

  ngOnInit() {
    // let editSalaryStructure
    let editSalaryStruc =this.salaryService.editSalaryStructureData;
    console.log("edit data",editSalaryStruc[0].basic);
    this.basicSalryCalculation(editSalaryStruc[0].basic,"def");
    //  console.log("Edit Data:",data.map(res=>{
    //   editSalaryStructure=res;
    //   console.log("map data=>",res)
    //   return editSalaryStructure;
    // }));
    
    
    //patch value into form
    this.editSalaryStructure.patchValue({
      saId: editSalaryStruc[0].saId,
      id: editSalaryStruc[0].id,
     
      basic:editSalaryStruc[0].basic,
      hra: editSalaryStruc[0].hra,
      conveyanceAllowance:editSalaryStruc[0].conveyanceAllowance,
      otherAllowance:editSalaryStruc[0].otherAllowance,
      grossPay:editSalaryStruc[0].grossPay,

      employeeEpf:editSalaryStruc[0].employeeEpf,
      employeeESI:editSalaryStruc[0].employeeESI,
      netSalary:editSalaryStruc[0].netSalary,
      employerEpf:editSalaryStruc[0].employerEpf,
      employerESI:editSalaryStruc[0].employerESI,
      totalCostToCompany:editSalaryStruc[0].totalCostToCompany,

   })
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
 basicSalryCalculation(bs,type?:any){
 
   if(type=="def"){
     this.basicSalary=bs;
     console.log("value",bs);
   }else{
     this.basicSalary=bs.target.value;
     console.log("value",bs.target.value);
   }
  //  console.log("baic",this.basicSalary);

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
    console.log("gross",this.grossPay);

    //employee's contribution EPF 12% of basic
    this.empEpf=Math.round((this.basicSalary/100)*12);

    //Employee contribution of ESI 0.75% of basic
    // console.log("ESI Of Employee");
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


  onEditSalaryStructureForm(){
    console.log("updated",this.editSalaryStructure.value)

      this.salaryService.updateEmpSalrecords(this.editSalaryStructure.value).subscribe(
        res=>{
          console.log("Updated records",res)
          this.location.back();
        },error=>{
          console.log("error");
          }
      )

    // let SalaryStructureDetails=JSON.parse(localStorage.getItem('SalaryStructureDetails'))
    // console.log("SalaryStructureDetails",SalaryStructureDetails)

    //      for (var i = 0; i < SalaryStructureDetails.length; ++i) {
    //         if (SalaryStructureDetails[i].id === this.editSalaryStructure.value.id) {
    //           SalaryStructureDetails[i] = this.editSalaryStructure.value;
    //           localStorage.setItem('SalaryStructureDetails',JSON.stringify(SalaryStructureDetails))
    //         }
    //       }
    //       console.log("emp SalaryStructureDetails Data:",SalaryStructureDetails);
         
    //      this.location.back();
  }

}
