import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/appService/task.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-task-emp',
  templateUrl: './task-emp.component.html',
  styleUrls: ['./task-emp.component.css']
})
export class TaskEmpComponent implements OnInit {

  id
  getAllTaskReport:any=[];
    constructor(private taskService:TaskService,
      private router:Router,
      private empProfileService:EmployeeProfileService) { }
    displayedColumns: string[] = ['sno','title','higherAuthName','projectName','description', 'timeAndDate','empRemark','completeDateAndTime','createdDate','updatedDate','status','operation'];
    dataSource=new MatTableDataSource(this.getAllTaskReport);
    @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;
  
    //Sorting
    @ViewChild(MatSort,{static:true}) sort: MatSort;
                                
    ngOnInit() {
      this.dataSource.paginator = this.paginator;
      
      this.dataSource.sort = this.sort;
      this.id=this.empProfileService.id;
      console.log("id",this.id);
      
     
      this.taskService.getAllSendTaskByEmployeeId(this.id).subscribe(
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

  //edit
  editTask(element:any){
    console.log("edit=>",element)
     this.taskService.getTaskAllData=element;
    //this.payrollService.editPayrollDetails(element);
    this.router.navigate(["empDashboard","viewTask"]);
  }

}
