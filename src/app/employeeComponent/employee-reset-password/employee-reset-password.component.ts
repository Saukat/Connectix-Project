import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConAdminLoginService } from 'src/app/connectixService/Admin/con-admin-login.service';
import { EmployeeLoginService } from 'src/app/connectixService/Employee/employee-login.service';
import { ResetPassword } from 'src/app/models/reset-password';
import { ConfirmedValidator } from 'src/app/Validator/ResetPasswordValidator';

@Component({
  selector: 'app-employee-reset-password',
  templateUrl: './employee-reset-password.component.html',
  styleUrls: ['./employee-reset-password.component.css']
})
export class EmployeeResetPasswordComponent implements OnInit {

  employeeResetPassword:FormGroup;

  

  constructor(private fb:FormBuilder,
   private router:Router,private empService:EmployeeLoginService,private adminService:ConAdminLoginService) {
   
    this.employeeResetPassword=fb.group({ 
      id:[''],
      oldPassword:['',Validators.required],
      newPassword:['',Validators.required],
      confirmPassword: ['', Validators.required]
    }, { 
      validator: ConfirmedValidator('newPassword', 'confirmPassword')
    })
  }
   id
  ngOnInit() {
    this.id=localStorage.getItem('token');
  }

  get f(){
    return this.employeeResetPassword.controls;
  }

  resetPassword(){
   let id= this.employeeResetPassword.value.id;
   let oldPassword=this.employeeResetPassword.value.oldPassword;
   let newPassword=this.employeeResetPassword.value.newPassword;

   let resetData:ResetPassword={
     id,
     oldPassword,
     newPassword
  }
     this.resetEmployeePassword(resetData);
  return resetData
   
  }

  resetEmployeePassword(resetData){
    console.log("data",resetData);
  this.empService.employeeResetPassword(resetData).subscribe(
    response=>{
         console.log("Sucessful reset",response);
         alert("Reset Password Successfully");
        this.adminService.logout();
    },error=>{
      //  console.log("Error of reset");
       alert("Invalid Credential");
       
    }
  ) 
    
  }

}
