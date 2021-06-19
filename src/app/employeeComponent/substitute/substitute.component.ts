import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-substitute',
  templateUrl: './substitute.component.html',
  styleUrls: ['./substitute.component.css']
})
export class SubstituteComponent implements OnInit {
  id;
  substituteApplier:any=[];
  constructor(private leaveService:LeaveAttendanceService,
    private empProfileService:EmployeeProfileService,
    private router:Router) { }
    displayedColumns: string[] = ['sno','title','subject','from','to', 'numberOfDays', 'leaveType','higAuthId','repAuthRemark','empId','backupEmpRemark','operation'];
    dataSource=new MatTableDataSource(this.substituteApplier);
    @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

    //Sorting
    @ViewChild(MatSort,{static:true}) sort: MatSort;
                                
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      
      this.dataSource.sort = this.sort;
       //id from login via service
       this.id=this.empProfileService.id;

       this.leaveService.substituteforLeaveAllData(this.id).subscribe(
        response=>{
             // console.log("data",response);
             this.substituteApplier=response
             this.dataSource.data=this.substituteApplier
             console.log("data",this.dataSource.data)
        },error=>{
             console.log("erroe",error);
        }
      )
  }

  onEmpLeaveDetails(data){
    console.log("id",data);
    this.leaveService.singleDataFOrSubstitute=data;
    this.router.navigate(['empDashboard','viewSubstitute']);
      
  }


   //filter data
   applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
   
}

}
