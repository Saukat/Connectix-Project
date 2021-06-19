import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FiscalYearService } from 'src/app/appService/fiscal-year.service';
import { FiscalYear } from 'src/app/models/fiscal-year';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.css']
})
export class FiscalYearComponent implements OnInit {

  fiscalYearData:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private fyService:FiscalYearService) { 
    this.fiscalYearData=fb.group({  //group the whole data into formLogicalName object
      id:[''],
      texable_salary:[''],
      exemption:[''],
      tds_deducted:[''],
      prev_emp_texable_sal:[''],
      prev_emp_tds_deducted:['']
     
   })
  }
  id;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  //getting from single-emp-details
    //console.log("id otherInfo ====>",this.id)  
  }
  onFiscalYearForm(){

    console.log("FY",this.fiscalYearData.value)

    
       let id=this.fiscalYearData.value.id;
       let texable_salary=this.fiscalYearData.value.texable_salary;
       let exemption=this.fiscalYearData.value.exemption;
       let tds_deducted=this.fiscalYearData.value.tds_deducted;
       let prev_emp_texable_sal=this.fiscalYearData.value.prev_emp_texable_sal;
       let prev_emp_tds_deducted=this.fiscalYearData.value.prev_emp_tds_deducted;
       

       let fy:FiscalYear={
        id,
        texable_salary,
        exemption,
        tds_deducted,
        prev_emp_texable_sal,
        prev_emp_tds_deducted
  
       
     }
    this.savefiscalYear(fy);
     return fy;
   
  }

  savefiscalYear(fy){
    console.log("paymentInfo Data",fy);
    this.fyService.saveFiscalYear(fy);  //send data to saveProvidentFund service class
  }

}
