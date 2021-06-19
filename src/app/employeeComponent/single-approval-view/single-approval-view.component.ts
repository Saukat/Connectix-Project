import { Component, OnInit, TemplateRef } from '@angular/core';
import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AttendanceService } from 'src/app/appService/attendance.service';
@Component({
  selector: 'app-single-approval-view',
  templateUrl: './single-approval-view.component.html',
  styleUrls: ['./single-approval-view.component.css']
})
export class SingleApprovalViewComponent implements OnInit {


  leaveApprovalForm:FormGroup;
  constructor(private leaveService:LeaveAttendanceService,
    private dialog:MatDialog,private fb:FormBuilder,
    private router:Router,private attendanceService:AttendanceService) { 
       this.leaveApprovalForm=fb.group({
        id:[''],
        status:['',Validators.required],
        repAuthRemark:['',Validators.required]
       })
    }
  approveData;
  leaveId;
  status=true
  ngOnInit() {
    this.approveData=this.leaveService.singleDataForApproval;
    console.log("Data",this.approveData);
    this.leaveId=this.approveData.id;
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




  onleaveApproval(){
    console.log("data of modal form",this.leaveApprovalForm.value.status);

    let attendEmpId=this.approveData.attendEmpId;
    let numberOfDays=this.approveData.numberOfDays;
     console.log("id",attendEmpId);
     
    

  let updateAttendance:any={
     attendEmpId,
     numberOfDays
  }
  
 console.log("Updated attendance",updateAttendance)
   if(this.leaveApprovalForm.value.status=="Approved"){
       
    this.leaveService.updateStatusAndRemarkOfHigherAuth(this.leaveApprovalForm.value).subscribe(
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
        this.router.navigate(['empDashboard','leaveApprove'])
        this.dialog.closeAll();
      },error=>{
        console.log("Error",error)
      }
    )
        
   }else{
      this.leaveService.updateStatusAndRemarkOfHigherAuth(this.leaveApprovalForm.value).subscribe(
      response=>{
        this.router.navigate(['empDashboard','leaveApprove'])
        this.dialog.closeAll();
      },error=>{
        console.log("Error",error)
      }
    )
   }
  
  }

}
