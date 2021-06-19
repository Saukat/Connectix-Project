import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConAdminLoginService } from 'src/app/connectixService/Admin/con-admin-login.service';

@Component({
  selector: 'app-reset-admin-password',
  templateUrl: './reset-admin-password.component.html',
  styleUrls: ['./reset-admin-password.component.css']
})
export class ResetAdminPasswordComponent implements OnInit {
  
  adminResetPassword:FormGroup;
  constructor(private fb:FormBuilder,private adminService:ConAdminLoginService,
   private router:Router) {
   
    this.adminResetPassword=fb.group({ 
      id:[''],
      email:[''],
      password:['',Validators.required],
   })
   }
  status;
  ngOnInit() {
       this.adminService.getAdminData().subscribe(
         res=>{
           console.log("all admin",res);
            this.adminResetPassword.patchValue({
              id:res[0].id,
              email:res[0].email
              
            })
          
         },error=>{
           console.log("No records");
           
         }
       )
  }

  resetPassword(){
    console.log("Reset");
    console.log("Data",this.adminResetPassword.value);
    
    this.adminService.resetAdminPasswordFun(this.adminResetPassword.value).subscribe(
      res=>{
        console.log("Reset",res);
        this.status=res;
        alert("Password Reset Successfully");
        this.adminService.logout();
        // this.router.navigate(['dashboard'])
      },error=>{
        console.log("error reset");
        
      }
    )
    
  }

}
