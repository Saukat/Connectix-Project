import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FiscalYearService } from 'src/app/appService/fiscal-year.service';

@Component({
  selector: 'app-edit-fiscal-year',
  templateUrl: './edit-fiscal-year.component.html',
  styleUrls: ['./edit-fiscal-year.component.css']
})
export class EditFiscalYearComponent implements OnInit {

  editFiscalYearData:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private fyService:FiscalYearService,private location:Location) { 
    this.editFiscalYearData=fb.group({  //group the whole data into formLogicalName object
      id:[''],
      texable_salary:[''],
      exemption:[''],
      tds_deducted:[''],
      prev_emp_texable_sal:[''],
      prev_emp_tds_deducted:['']
     
   })
  }

  ngOnInit() {

     let editFYData=this.fyService.editFiscalYearData;
    console.log("Edit Data:",editFYData);
    
    
    //patch value into form
    this.editFiscalYearData.patchValue({
      id: editFYData[0].id,
      texable_salary:editFYData[0].texable_salary,
      exemption:editFYData[0].exemption,
      tds_deducted: editFYData[0].tds_deducted,
      prev_emp_texable_sal:editFYData[0].prev_emp_texable_sal,
      prev_emp_tds_deducted:editFYData[0].prev_emp_tds_deducted
   })
  }

  onEditFiscalYearForm(){
    console.log("Data of editFiscalYearData=>",this.editFiscalYearData.value)



    let allFyData=JSON.parse(localStorage.getItem('FiscalYearDetails'))
    console.log("allFyData all",allFyData)

         for (var i = 0; i < allFyData.length; ++i) {
            if (allFyData[i].id === this.editFiscalYearData.value.id) {
              allFyData[i] = this.editFiscalYearData.value;
              localStorage.setItem('FiscalYearDetails',JSON.stringify(allFyData))
            }
          }
          console.log("emp allFyData Data:",allFyData);
          this.location.back();
          
          
  }
  

  

}
