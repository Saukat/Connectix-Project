import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-leave-approval-list',
  templateUrl: './leave-approval-list.component.html',
  styleUrls: ['./leave-approval-list.component.css']
})
export class LeaveApprovalListComponent implements OnInit {

  id;
  approvalReport:any=[];
  constructor(private leaveService:LeaveAttendanceService,
    private router:Router,
    private empProfileService:EmployeeProfileService) { }
  displayedColumns: string[] = ['sno','title','subject','from','to', 'numberOfDays', 'leaveType','empId','backupEmpId','repAuthRemark','backupEmpRemark','status','operation'];
  dataSource=new MatTableDataSource(this.approvalReport);
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    this.id=this.empProfileService.id;
    console.log("id",this.id);
    
   
    this.leaveService.leaveApproveAllData(this.id).subscribe(
      response=>{
        
        this.approvalReport=response
        console.log("data of list ",this.approvalReport);
           this.dataSource.data=this.approvalReport
          //  console.log("data",this.dataSource.data)
      },error=>{
           console.log("erroe",error);
      }
    )
    
  }
  onEmpLeaveDetailsApprove(approveData){
            console.log("approve Data",approveData);
            this.leaveService.singleDataForApproval=approveData;
            this.router.navigate(['empDashboard','viewSingleApproval']);
  }

  //filter data
  applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
   
}

}
