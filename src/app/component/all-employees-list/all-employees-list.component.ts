import { DataSource } from '@angular/cdk/table';
import { HttpErrorResponse } from '@angular/common/http';
import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeService } from 'src/app/appService/employee.service';
import { Employee } from 'src/app/models/employee';










@Component({
  selector: 'app-all-employees-list',
  templateUrl: './all-employees-list.component.html',
  styleUrls: ['./all-employees-list.component.css']
})
export class AllEmployeesListComponent implements OnInit {


  fetching=true;

  allEmployeeData:any=[];
      
  noData;
 

  employees:any=[]
 
 
  constructor(private router:Router,private empService:EmployeeService){}

  displayedColumns: string[] = ['sno','name','email','hireDate','jobTitle', 'location', 'department', 'rollType','status', 'gender','operation'];
                                  
  dataSource=new MatTableDataSource(this.allEmployeeData)

  //paginator
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    
   let data;
   let p;
   
   let all=this.empService.getAllEmpData().subscribe(
     response=>{
      this.fetching=false
       console.log("res",response)
        this.employees=response;
       console.log("dta",this.employees);
       this.dataSource.data=this.employees
    
     },(error:HttpErrorResponse)=>{
      this.fetching=false

      // this.dataSource.data=error.error.text;
      this.noData="No Data Found!!";
       console.log("error");
     }
   )
 

  //  this.allEmployeeData=JSON.parse(localStorage.getItem('EmployeesRegisterData'));
  //  this.dataSource.data=this.allEmployeeData;
 

   
  }
  
  
  onEmpDetails(id){
    //  this.empService.getOneEmpDetails(id);
     //this.router.navigate(['dashboard','one',id]);
    //  this.empService.getSingleEmployee(id);
     this.router.navigate(['dashboard','one',id]);
  //  this.empService.getSingleEmployee(id).subscribe(
  //    response=>{
  //         console.log("single data",response)
  //    },error=>{
  //         console.log("error");
  //    }
  //  )

  }

  //filter data
  applyFilter(filterValue:string){
         this.dataSource.filter=filterValue.trim().toLowerCase();
        
  }

}
