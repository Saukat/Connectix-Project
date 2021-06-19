import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/appService/task.service';

@Component({
  selector: 'app-task-emp-response',
  templateUrl: './task-emp-response.component.html',
  styleUrls: ['./task-emp-response.component.css']
})
export class TaskEmpResponseComponent implements OnInit {

  getOneTaskData;

  taskId;
  empTaskRemarkForm:FormGroup
  constructor(private taskService:TaskService,private dialog:MatDialog,
    private fb:FormBuilder,private router:Router) { 
      this.empTaskRemarkForm=fb.group({
          id:[''],
          status:['',Validators.required],
          empRemark:['',Validators.required],
          completeDateAndTime:['',Validators.required],
      })
    }
  ngOnInit() {
    this.getOneTaskData=this.taskService.getTaskAllData;
     
    this.taskId=this.getOneTaskData.id;
  }

  openDialog(template: TemplateRef<any>){
    this.dialog.open(template);
}

onEmpTaskRemark(){
  console.log("data",this.empTaskRemarkForm.value);
  this.taskService.employeeTaskUpdate(this.empTaskRemarkForm.value).subscribe(
    response=>{
      console.log("updated",response);
      this.router.navigate(["empDashboard","empTask"]);
      this.dialog.closeAll();
    },error=>{
      console.log("Error");
    }
  )
}




}
