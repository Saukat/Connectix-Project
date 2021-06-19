import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ReimbursementService } from 'src/app/appService/reimbursement.service';
import { TaskService } from 'src/app/appService/task.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-reimb-list',
  templateUrl: './reimb-list.component.html',
  styleUrls: ['./reimb-list.component.css']
})
export class ReimbListComponent implements OnInit {
  id;
  getAllReim:any=[];
  constructor(private reimService:ReimbursementService,
    private router:Router,
    private empProfileService:EmployeeProfileService) { }
  displayedColumns: string[] = ['sno','title','subject', 'billDate', 'amount','highAuthName','higherAuthremark','status'];
  dataSource=new MatTableDataSource(this.getAllReim);
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    this.id=this.empProfileService.id;
    console.log("id",this.id);
    
   
    this.reimService.getAllReimById(this.id).subscribe(
      response=>{
        
        this.getAllReim=response
        
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
addNewReim(){
  this.router.navigate(["empDashboard","reimbursement"]);
}

editReim(element){
  
  console.log("edit=>",element)
     this.reimService.getReimAllData=element;
    //this.payrollService.editPayrollDetails(element);
    this.router.navigate(["empDashboard","editReim"]);
}



}
