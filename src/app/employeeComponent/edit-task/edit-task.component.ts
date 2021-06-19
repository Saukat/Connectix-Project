import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/appService/employee.service';
import { TaskService } from 'src/app/appService/task.service';
import { EmployeeLoginService } from 'src/app/connectixService/Employee/employee-login.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {

  editTaskForm:FormGroup;
  constructor(private fb:FormBuilder,private empService:EmployeeService,
    private empProfileService:EmployeeProfileService,
    private taskService:TaskService,
    private router:Router,
    // private router:Router,private mailService:MailService,
    private _empLoginService:EmployeeLoginService,) {
    this.editTaskForm=fb.group({
      id:[''],
      higherAuthId:[''],
      higherAuthName:['',Validators.required],
      projectName:['',Validators.required],
      description:['',Validators.required],

      timeAndDate:['',Validators.required],
      employeeId:['',Validators.required],
      employeeName:['',Validators.required],
      title:['',Validators.required],
      status:[''],
      createdDate:[],
    })
   }
   allTask;
   id;
   name;
   allEmpData;
   empIdAndName
  ngOnInit() {


    this.id=this.empProfileService.id;
    this.name=this._empLoginService.empName;
    console.log("name",this.name)

    this.empService.getAllEmpData().subscribe(
      response=>{
       
        this.allEmpData=response;
          console.log("All Employee Details",response);

         let p= this.allEmpData.filter((e,i,a)=>{
          // console.log("data without self");
              
             return e.id!==this.id
          })
          // console.log("data without self",p);
          this.empIdAndName=p;
          console.log("HireAuth ",p)
        
      },error=>{
         console.log(error);
      }
   )

    this.allTask=this.taskService.getTaskAllData;
            
  this.replacementName=this.allTask.employeeName;
    
     
    //patch value into form
       this.editTaskForm.patchValue({
         id:this.allTask.id,
         higherAuthId:this.allTask.higherAuthId,
         higherAuthName:this.allTask.higherAuthName,
         projectName:this.allTask.projectName,
         description:this.allTask.description,
         timeAndDate:this.allTask.timeAndDate,

         employeeId:this.allTask.employeeId,
         employeeName:this.allTask.employeeName,
         title:this.allTask.title,
         status:this.allTask.status,
         createdDate:this.allTask.createdDate,
     })
    
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

  onEditTaskForm(){
  
    console.log("dataaa",this.editTaskForm.value);
    this.taskService.updateTask(this.editTaskForm.value).subscribe(
      response=>{
        console.log("Sucess updated",response)
        this.router.navigate(["empDashboard","taskList"]);
      },error=>{
        console.log("error");
        
      }
    )
    
  }

}
