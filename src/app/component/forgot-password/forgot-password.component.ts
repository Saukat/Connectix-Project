import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/appService/employee.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  status;
  sta=false
  fetching=false; 
  forgotPasswordForm:FormGroup
  constructor(private fb:FormBuilder,private employeeService:EmployeeService,private router:Router) { 
    this.forgotPasswordForm=fb.group({
      to:['',[Validators.required,Validators.email]],
    })
  }
  ngOnInit() {
  }
  onforgotPassword(){
    this.fetching=true;
    console.log(this.forgotPasswordForm.value);
    this.employeeService.forgotPassword(this.forgotPasswordForm.value).subscribe(
      response=>{
        console.log(response);
        this.fetching=false;
        this.sta=true
        this.status=response;
        this.router.navigate(['adminLogin']);
      },error=>{
        this.fetching=false;
        this.sta=true
        console.log("error");
        this.status="Invalid Email Id"
      }
    )
  }
  onLogin(){
      this.router.navigate(['adminLogin']);
  }

}
