import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AttendanceService } from 'src/app/appService/attendance.service';

@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrls: ['./edit-attendance.component.css']
})
export class EditAttendanceComponent implements OnInit {

  EditAttendanceData:FormGroup;
  constructor(private attendanceService:AttendanceService,
    private route:ActivatedRoute,private fb:FormBuilder,private location:Location) {
    this.EditAttendanceData=fb.group({
       id:[''],
       attendEmpId:[''],
       totalDayOfMonth:[''],
       leaveTaken:[''],
       remain:[''],
       totalLeave:['']
    })
   }
  id
  ngOnInit() {

    // this.id = this.route.snapshot.params['id'];  
    // console.log("id otherInfo ====>",this.id)  

   let attendance=this.attendanceService.getAttendanceDataForEdit;
   console.log("att",attendance);
   
   this.EditAttendanceData.patchValue({
      id: attendance[0].id,
      attendEmpId:attendance[0].attendEmpId,
      totalDayOfMonth: attendance[0].totalDayOfMonth,
      leaveTaken:attendance[0].leaveTaken,
      remain:attendance[0].remain,
      totalLeave:attendance[0].totalLeave,
   })

  }

  onEditAttendanceForm(){
    this.attendanceService.updateAttendance(this.EditAttendanceData.value).subscribe(
      response=>{
         console.log("Data of eddit",response);
         this.location.back();
      },error=>{
          console.log("error");
          
      }
    )
  }

}