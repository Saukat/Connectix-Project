import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-admin-leave-approval',
  templateUrl: './admin-leave-approval.component.html',
  styleUrls: ['./admin-leave-approval.component.css']
})
export class AdminLeaveApprovalComponent implements OnInit {
  fetching=true;
  noData;
  id;
  approvalReport:any=[];
  constructor(private leaveService:LeaveAttendanceService,
    private router:Router,
    private empProfileService:EmployeeProfileService) { }
  displayedColumns: string[] = ['sno','title','subject','from','to', 'numberOfDays', 'leaveType','empId','backupEmpId','backupEmpRemark','repAuthRemark','status','operation'];
  dataSource=new MatTableDataSource(this.approvalReport);
  //paginator
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    // this.id=this.empProfileService.id;
    this.id=localStorage.getItem('token');
    console.log("id",this.id);

    this.leaveService.leaveApproveAllData(this.id).subscribe(
      response=>{
        this.fetching=false
        this.approvalReport=response
        console.log("data of approval",this.approvalReport);
           this.dataSource.data=this.approvalReport
          //  console.log("data",this.dataSource.data)
      },error=>{
        this.fetching=false;
        this.noData="No Data Found!!";
           console.log("erroe",error);
      }
    )
    
  }
  onAdminDetailsApprove(approveData){
            console.log("approve Data",approveData);
            this.leaveService.singleDataForApproval=approveData;
            this.router.navigate(['dashboard','adminViewApproval']);
  }
 //filter data
 applyFilter(filterValue:string){
  this.dataSource.filter=filterValue.trim().toLowerCase();
 
}
}
