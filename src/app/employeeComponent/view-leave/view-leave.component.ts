import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-view-leave',
  templateUrl: './view-leave.component.html',
  styleUrls: ['./view-leave.component.css']
})
export class ViewLeaveComponent implements OnInit {

  id;
  leaveReport:any=[];
//  allReportList:any=[];
  constructor(private leaveService:LeaveAttendanceService,
    private empProfileService:EmployeeProfileService,
    private router:Router) { }
  
  displayedColumns: string[] = ['sno','title','subject','from','to', 'numberOfDays', 'leaveType','higAuthId','backupEmpId','repAuthRemark','backupEmpRemark','status','operation'];
  dataSource=new MatTableDataSource(this.leaveReport)
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;

     //id from login via service
     this.id=this.empProfileService.id;
      console.log("Data of leave id",this.id);
      
     this.leaveService.getSingleEmployeeLeave(this.id).subscribe(
       response=>{
            // console.log("data",response);
            this.leaveReport=response
            this.dataSource.data=this.leaveReport
        
       },error=>{
            console.log("erroe",error);
       }
     )
  }

  onEmpLeaveDetails(data){
    console.log("id",data);
    this.leaveService.singleLeaveView=data;
    this.router.navigate(['empDashboard','viewSingleLeave']);
      
  }

   //filter data
   applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
   
}

}
