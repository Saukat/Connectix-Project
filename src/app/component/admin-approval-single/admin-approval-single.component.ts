import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { AttendanceService } from 'src/app/appService/attendance.service';

import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';

@Component({
  selector: 'app-admin-approval-single',
  templateUrl: './admin-approval-single.component.html',
  styleUrls: ['./admin-approval-single.component.css']
})
export class AdminApprovalSingleComponent implements OnInit {
  approveData;
  id
  leaveAdminApprovalForm:FormGroup;
  constructor(private leaveService:LeaveAttendanceService,
    private dialog:MatDialog,private fb:FormBuilder,
    private router:Router,private attendanceService:AttendanceService) { 
       this.leaveAdminApprovalForm=fb.group({
        id:[''],
        status:['',Validators.required],
        repAuthRemark:['',Validators.required]
       })
    }
 status=true
  ngOnInit() {
    this.approveData=this.leaveService.singleDataForApproval;
    // console.log("approveed",this.approveData);
    
    this.id=this.approveData.id;
    if(this.approveData.status==="applied"){
      // status=this.approveData
      this.status=true
    }else{
      // status=this.approveData
      this.status=false
    }
  }

  openDialog(template: TemplateRef<any>){
    this.dialog.open(template);
}

  onleaveAdminApproval(){

    let attendEmpId=this.approveData.attendEmpId;
    let numberOfDays=this.approveData.numberOfDays;
     console.log("id",attendEmpId);
     
    

  let updateAttendance:any={
     attendEmpId,
     numberOfDays
  }
  
 console.log("Updated attendance",updateAttendance)

   

 if(this.leaveAdminApprovalForm.value.status=="Approved"){
       
  this.leaveService.updateStatusAndRemarkOfHigherAuth(this.leaveAdminApprovalForm.value).subscribe(
    response=>{
      
      
      //update employee leave and attendance table
      this.attendanceService.updateAttendanceById(updateAttendance).subscribe(
        response=>{
           console.log("Data of eddit",response);
          //  this.location.back();
        },error=>{
            console.log("error");
            
        }
      )
      //navigate 
      this.router.navigate(['dashboard','adminLeaveApproval'])
      this.dialog.closeAll();
    },error=>{
      console.log("Error",error)
    }
  )
      
 }else{
    this.leaveService.updateStatusAndRemarkOfHigherAuth(this.leaveAdminApprovalForm.value).subscribe(
    response=>{
      this.router.navigate(['dashboard','adminLeaveApproval'])
      this.dialog.closeAll();
    },error=>{
      console.log("Error",error)
    }
  )
 }

   
    // this.leaveService.updateStatusAndRemarkOfHigherAuth(this.leaveAdminApprovalForm.value).subscribe(
    //   response=>{
    //     this.router.navigate(['dashboard','adminLeaveApproval'])
    //     this.dialog.closeAll();
    //   },error=>{
    //     console.log("Error",error)
    //   }
    // )


  }

}
