import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/appService/task.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-all-task-list',
  templateUrl: './all-task-list.component.html',
  styleUrls: ['./all-task-list.component.css']
})
export class AllTaskListComponent implements OnInit {

  id
  getAllTaskReport:any=[];
  constructor(private taskService:TaskService,
    private router:Router,
    private empProfileService:EmployeeProfileService) { }
  displayedColumns: string[] = ['sno','title','projectName','description', 'timeAndDate', 'employeeName','empRemark','higherAuthName','completeDateAndTime','createdDate','updatedDate','status'];
  dataSource=new MatTableDataSource(this.getAllTaskReport);
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    this.id=this.empProfileService.id;
    // console.log("id",this.id);
    
   
    this.taskService.getAllEmployeeAddTaskForAdmin().subscribe(
      response=>{
        
        this.getAllTaskReport=response
        
           this.dataSource.data=this.getAllTaskReport
          //  console.log("data",this.dataSource.data)
      },error=>{
           console.log("error",error);
      }
    )
  }

   //filter data
   applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
}

}
