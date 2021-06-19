import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ReimbursementService } from 'src/app/appService/reimbursement.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-reimb-request-list',
  templateUrl: './reimb-request-list.component.html',
  styleUrls: ['./reimb-request-list.component.css']
})
export class ReimbRequestListComponent implements OnInit {
  id;
  getAllReim:any=[];
  constructor(private reimService:ReimbursementService,
    private router:Router,
    private empProfileService:EmployeeProfileService) { }
  displayedColumns: string[] = ['sno','empName','title','subject', 'billDate', 'amount','higherAuthremark','status','operation'];
  dataSource=new MatTableDataSource(this.getAllReim);
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    this.id=this.empProfileService.id;
    console.log("id",this.id);
    
   
    this.reimService.getReimRecordsByHigherAuth(this.id).subscribe(
      response=>{
        
        this.getAllReim=response
        console.log("Data :",this.getAllReim);
        

           this.dataSource.data=this.getAllReim
           console.log("data",this.dataSource.data)
      },error=>{
           console.log("error",error);
      }
    )
  }

   //filter data
   applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
}

viewReim(element){
  console.log("edit=>",element)
  this.reimService.getReimSingleData=element;
 //this.payrollService.editPayrollDetails(element);
 this.router.navigate(["empDashboard","reimApproval"]);
}

}
