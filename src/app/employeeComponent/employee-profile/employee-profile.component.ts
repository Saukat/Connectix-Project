import { Location } from '@angular/common';
import { Route } from '@angular/compiler/src/core';
import { Component, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/appService/employee.service';

import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';
import {Chart} from 'node_modules/chart.js';
import { AttendanceService } from 'src/app/appService/attendance.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.css']
})
export class EmployeeProfileComponent implements OnInit {
  oneRecordBasedOnEmail;
  oneRecordBasedOnId;

  constructor(private empProfileService:EmployeeProfileService,
   private empService:EmployeeService,
   private dialog:MatDialog,
   private location:Location,
   private router:Router,
   private attendanceService:AttendanceService,
    private route:ActivatedRoute) { }
  id
  data;
  attendanceData;
  ngOnInit() {


   




    
    this.id = this.route.snapshot.params['id']; 
    console.log("Data of profile ====>",this.id)  
       this.empProfileService.getOneRecordsUsingId().subscribe(
         res=>{
              console.log("data",res);
              this.data=res;
              let singleEmp=this.data.filter((data,index)=>{
                       return data.id==this.id
                   }).map(res=>{
                     this.oneRecordBasedOnId=res;
                     this.empProfileService.oneRecordsOfEmp=this.oneRecordBasedOnId;
                   })
                // console.log("one Records",singleEmp);

         },error=>{
             console.log("error");
             
         }
       )
    // this.empProfileService.email=this.email;
    this.empProfileService.id=this.id;

    this.attendanceService.getSingleEmpAttendance(this.id).subscribe(
      response=>{
        this.attendanceData=response;
        console.log("Data",this.attendanceData.totalLeave);
        this.chart(this.attendanceData.totalLeave,this.attendanceData.remain,this.attendanceData.leaveTaken);
        
      },error=>{
        console.log("error");
        
      }
    )

    //  this.oneRecordBasedOnEmail=this.empProfileService.getAllDataOfEmployeeReg(this.email);
    //  console.log(this.oneRecordBasedOnEmail.photo)
  }


  //conevrt into base64
photo="./assets/images/profile.jpg";
image;

onFileSelected($event) : void {
  this.readThis($event.target);
 
  
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
     this.photo=this.image
     console.log("Photo",this.photo);
     
  }
  myReader.readAsDataURL(file);
 
}

openDialog(template: TemplateRef<any>){
  this.dialog.open(template);
}

editProfilePhoto(){
  let id=localStorage.getItem("token");
  let photo=this.photo;
  const editProfileData={
    id,
    photo
  }
  console.log("id",editProfileData);
  this.empService.editProfilePhoto(editProfileData).subscribe(
    response=>{
        console.log(response);
        // this.router.navigate(['empDashboard','empProfil',id])
        this.ngOnInit();
      // this.location.back();
        this.dialog.closeAll();
        
    },error=>{
       console.log("error")
    }
  )

}
chart(totalLeave,remain,leaveTaken){
  var myChart = new Chart("myChart", {
    type: 'bar',
    data: {
        labels: ['Leave Taken', 'Remain','Total Leave'],
        datasets: [{
            label: 'Attendance Chart',
            // label1: 'Leave Chart',
            data:[
              leaveTaken,
              remain,
              totalLeave
        ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                // 'rgba(75, 192, 192, 0.2)',
                // 'rgba(153, 102, 255, 0.2)',
                // 'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 159, 64, 1',
                // 'rgba(75, 192, 192, 1)',
                // 'rgba(153, 102, 255, 1)',
                // 'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
}


}
