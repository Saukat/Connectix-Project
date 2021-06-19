import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/appService/employee.service';
import { TaskService } from 'src/app/appService/task.service';
import { EmployeeLoginService } from 'src/app/connectixService/Employee/employee-login.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  taskForm:FormGroup;
  constructor(private fb:FormBuilder,private empService:EmployeeService,
    private empProfileService:EmployeeProfileService,
    private taskService:TaskService,
    private router:Router,
    // private router:Router,private mailService:MailService,
    private _empLoginService:EmployeeLoginService,) {
    this.taskForm=fb.group({

      higherAuthId:['',Validators.required],
      higherAuthName:['',Validators.required],
      projectName:['',Validators.required],
      description:['',Validators.required],

      timeAndDate:['',Validators.required],
      employeeId:['',Validators.required],
      employeeName:['',Validators.required],
      title:['',Validators.required],
      status:['Work Pending'],
    })
   }
   empIdAndName;
   allEmpData;
   id;
   name;
  ngOnInit() {
    // this.name=this._empLoginService.empName;
    this.id=this.empProfileService.id;
    this.name=this._empLoginService.empName;
    console.log("name",this.name)

    this.empService.getAllEmpData().subscribe(
      response=>{
       
        this.allEmpData=response;
          console.log("All Employee Details",response);

         let p= this.allEmpData.filter((e,i,a)=>{
          // console.log("data without self");
              
             return e.id;
          })
          // console.log("data without self",p);
          this.empIdAndName=p;
          console.log("HireAuth ",p)
        
      },error=>{
         console.log(error);
      }
   )
  }

  replacementName;
  replaceDDL(event){
    console.log("data",event.target.value);
    // console.log(this.empIdAndName)
    this.empIdAndName.filter((e,i,a)=>{
       if(e.id===event.target.value){
         this.replacementName=e.name;
         return this.replacementName;
       }
    })
  }

  fetching=true;
  sta
  islogin=false
  onTaskForm(){
    this.fetching=true;
    console.log(this.taskForm.value);

    this.taskService.sendTaskToEmployee(this.taskForm.value).subscribe(
      response=>{
        this.sta=response['status']
        this.fetching=false;
       this.router.navigate(["empDashboard","taskList"]);
      },error=>{
        this.fetching=false;
        this.islogin=true
        this.sta="Failed"
        console.log("Error")
      }
    )
    
  }
}
