import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AttendanceService } from 'src/app/appService/attendance.service';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendanceData:FormGroup;
  constructor(private attendanceService:AttendanceService,
    private route:ActivatedRoute,private fb:FormBuilder,private location:Location) {

    this.attendanceData=fb.group({
      attendEmpId:[''],
       totalDayOfMonth:[''],
       leaveTaken:[''],
       remain:[''],
       totalLeave:['']
    })
   }
   id
  ngOnInit() {

    this.id = this.route.snapshot.params['id'];  //getting from single-emp-details
    console.log("id otherInfo ====>",this.id)  


  

  }

  onAttendanceForm(){
    this.attendanceService.saveAttendance(this.attendanceData.value).subscribe(
      response=>{
         console.log("Data of eddit",response);
         this.location.back();
      },error=>{
          console.log("error");
          
      }
    )
  }

}
