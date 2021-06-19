import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { ReimbursementService } from 'src/app/appService/reimbursement.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-reimbursement-list',
  templateUrl: './reimbursement-list.component.html',
  styleUrls: ['./reimbursement-list.component.css']
})
export class ReimbursementListComponent implements OnInit {

  id;
  getAllReim:any=[];
  constructor(private reimService:ReimbursementService,
    private router:Router,
    private empProfileService:EmployeeProfileService) { }
  displayedColumns: string[] = ['sno','empName','title','subject', 'billDate', 'amount','higherAuthremark','status','reportStatus','paymentStatus'];
  dataSource=new MatTableDataSource(this.getAllReim);
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    this.id=localStorage.getItem('token');
    console.log("id of token",this.id);
    
   
    this.reimService.getAllReim().subscribe(
      response=>{
        
        this.getAllReim=response
        console.log("Data :",this.getAllReim);
        

           this.dataSource.data=this.getAllReim
           console.log("data11",this.dataSource.data)
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
 this.router.navigate(["dashboard","reimbApproval"]);
}


reportProcess(){

   console.log("Saukat");

    //  let flag=true;
    let dia= confirm("Are You Sure to Final!!");
     if(dia===true){
       console.log("yes");
       
       this.reimService.updateReportStatus().subscribe(
        response=>{
          
            this.ngOnInit(); 
      },error=>{
      //  console.log("status Error");
       this.ngOnInit();
      }
    )
     }else{
       console.log("not happend")
       this.ngOnInit();
     }
   
}

}
