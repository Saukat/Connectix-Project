import { DatePipe, Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import {FormControl} from '@angular/forms';
// import { MatDatepicker } from '@angular/material';



import { ActivatedRoute, Router } from '@angular/router';
import { PayrollDetailsService } from 'src/app/appService/payroll-details.service';
import { ConAdminLoginService } from 'src/app/connectixService/Admin/con-admin-login.service';
import { EmployeeLoginService } from 'src/app/connectixService/Employee/employee-login.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';



@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
  providers: [
  
  ],
})
export class EmployeeDashboardComponent implements OnInit,OnChanges {
 

  id
  constructor(private location:Location,
    private _adminService:ConAdminLoginService,
    private router:Router,private route:ActivatedRoute,
    private _empLoginService:EmployeeLoginService,
    private _payrollService:PayrollDetailsService,
    private employeeProfileService:EmployeeProfileService) { 
    // this.route.params.subscribe(data=>{
    //   this.id=data.id;
    //   console.log("con",this.id);
      
    // })
    
  }
  ngOnChanges(): void {
    this.onSelectCalendar(event);
    console.log("change evented");
    
  }


 name;
 monthYear;
  ngOnInit() {
    
    // this.id = this.route.snapshot.params['id']; 
    this.id=localStorage.getItem('token');
    console.log("id",this.id)
    this.name=this._empLoginService.empName;
    this._payrollService.calendarWiseRecords(this.id).subscribe(
      response=>{
           console.log("response of calendar",response);

           this.monthYear=response;
        
           
      },error=>{
        console.log("error");
        
      }
    )


  }
  
  employeeProfile(){
      // this.location.back();
      // this.router.navigate(['**']);
      // this.router.navigate(['dashboard','otherInfo',this.id]);
  }

  onChange(event){
    console.log("1");
    
  }
  LogoutAdmin(){

    alert("Logout Sucessfully!!")
    this._adminService.logout();
  }

  onSelectCalendar(event){
    let monthYear=event.target.value;
    console.log("changed",monthYear);
    // this.ngOnChanges();
    if(monthYear==="null"){
        console.log("Null value")
    }else{
      this.router.routeReuseStrategy.shouldReuseRoute= function(){
        return false;
      }
      this.router.onSameUrlNavigation = 'reload'
      console.log("calendar")
      this.employeeProfileService.getMonthYear=monthYear;
      console.log("2",this.employeeProfileService.getMonthYear)
      this.router.navigate(['empDashboard','empPaySlip']);
    }
  }

  onSelectTask(event){
   let taskType=event.target.value;
   console.log(taskType);
   
   if(taskType==="null"){
     console.log("Null Data")
   }else if(taskType==="1"){
         this.router.navigate(['empDashboard','task'])
   }else if(taskType==="2"){
    this.router.navigate(['empDashboard','taskList'])
   }else if(taskType==="3"){
    this.router.navigate(['empDashboard','empTask'])
   }else{
    this.router.navigate(['empDashboard','employeeAddTask'])
   }

  }

  onSelectReim(event){
    let taskType=event.target.value;
    console.log(taskType);
    
    if(taskType==="null"){
      console.log("Null Data")
    }else if(taskType==="1"){
          this.router.navigate(['empDashboard','reimbursement'])
    }else if(taskType==="2"){
     this.router.navigate(['empDashboard','reimList'])
    }else{
     this.router.navigate(['empDashboard','reimRequest'])
    }
  }



  onSelectLeave(event){
    let LeaveType=event.target.value;
    console.log(LeaveType);
    
    if(LeaveType==="null"){
      console.log("Null Data")
    }else if(LeaveType==="1"){
          this.router.navigate(['empDashboard','leave'])
    }else if(LeaveType==="2"){
     this.router.navigate(['empDashboard','viewLeave'])
    }else if(LeaveType==="3"){
     this.router.navigate(['empDashboard','leaveApprove'])
    }else{
      this.router.navigate(['empDashboard','substitute'])
    }
  }
  
}
