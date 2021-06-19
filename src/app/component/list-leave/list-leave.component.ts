import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-list-leave',
  templateUrl: './list-leave.component.html',
  styleUrls: ['./list-leave.component.css']
})
export class ListLeaveComponent implements OnInit {
  leaveReport:any=[];
  fetching=true;
  noData;
  constructor(private leaveService:LeaveAttendanceService,
    private empProfileService:EmployeeProfileService,
    private router:Router) { }
    displayedColumns: string[] = ['sno','empId','title','subject','from','to', 'numberOfDays', 'leaveType','higAuthId','backupEmpId','repAuthRemark','backupEmpRemark','status'];
    dataSource=new MatTableDataSource(this.leaveReport)
     //paginator
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;

    this.leaveService.allLeaveRecordsData().subscribe(
      response=>{
        this.fetching=false;
           // console.log("data",response);
           this.leaveReport=response
           this.dataSource.data=this.leaveReport
       
      },error=>{
        this.fetching=false;
        this.noData="No Data Found!!"
           console.log("erroe",error);
      }
    )
  }

   //filter data
   applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
   
}

}
