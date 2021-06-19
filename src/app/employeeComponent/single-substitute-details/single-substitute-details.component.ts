import { Location } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';

@Component({
  selector: 'app-single-substitute-details',
  templateUrl: './single-substitute-details.component.html',
  styleUrls: ['./single-substitute-details.component.css']
})
export class SingleSubstituteDetailsComponent implements OnInit {
  substituteData;
   id;

  leaveSubstituteForm:FormGroup;
  constructor(private leaveService:LeaveAttendanceService,private dialog:MatDialog,
    private fb:FormBuilder,private router:Router,private location:Location) { 
      this.leaveSubstituteForm=fb.group({
        id:[''],
        backupEmpRemark:['',Validators.required]
      })
    }

    status=true
  ngOnInit() {
    this.substituteData=this.leaveService.singleDataFOrSubstitute;
    console.log("Data",this.substituteData);
    this.id=this.substituteData.id;
    console.log("!!!1",this.substituteData.backupEmpRemark);
    
    if(!isNaN(this.substituteData.backupEmpRemark)){
      // status=this.approveData
      console.log("2");
      
      this.status=true
    }else{
      // status=this.approveData
      console.log("3");
      
      this.status=false
    }
  }
  openDialog(template: TemplateRef<any>){
      this.dialog.open(template);
  }
  onleaveSubstitute(){
    console.log("OK",this.leaveSubstituteForm.value);
    this.leaveService.updateSubstituteRemark(this.leaveSubstituteForm.value).subscribe(
      response=>{
        this.router.navigate(['empDashboard','substitute'])
        this.dialog.closeAll();
      },error=>{
         console.log("Error");
         
      }
    )
    
  }



}
