import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/appService/task.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;  
id
getAllTaskReport:any=[];
  constructor(private taskService:TaskService,
    private router:Router,
    private empProfileService:EmployeeProfileService) { }
  displayedColumns: string[] = ['sno','title','projectName','description', 'timeAndDate', 'employeeName','empRemark','completeDateAndTime','createdDate','updatedDate','status','operation'];
  dataSource=new MatTableDataSource(this.getAllTaskReport);
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
                              
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;
    this.id=this.empProfileService.id;
    console.log("id",this.id);
    
   
    this.taskService.getAllSendTaskByHigherId(this.id).subscribe(
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
addNewTask(){
  this.router.navigate(['empDashboard','task'])
}

   
  //edit
  editTask(element:any){
    console.log("edit=>",element)
     this.taskService.getTaskAllData=element;
    //this.payrollService.editPayrollDetails(element);
    this.router.navigate(["empDashboard","editTask"]);
  }

  ExportTOExcel(){
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.TABLE.nativeElement);  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();  
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');  
    XLSX.writeFile(wb, 'Task.csv');  
    
  } 

}
