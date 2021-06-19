import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConAdminLoginService } from 'src/app/connectixService/Admin/con-admin-login.service';
import { EmployeeLoginService } from 'src/app/connectixService/Employee/employee-login.service';
import { AdminLogin } from 'src/app/models/admin-login';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent implements OnInit {

  islogin:any=true;
  adminData
  adminloginForm:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,
    private _adminloginSer:ConAdminLoginService,
    private _empLoginService:EmployeeLoginService,
    private router:Router) { 
    this.adminloginForm=fb.group({  //group the whole data into formLogicalName object
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
   })
  }
  ngOnInit() {
            // this.adminData=this.adminloginService.adminData;
       
  }
  
  ddlVal
  onOptionsSelected(value){
    this.ddlVal=value
      console.log("ddl",this.ddlVal);
      
  }


  //onSubmit data
  onLoginForm(){

   let email=this.adminloginForm.value.email;
   let password=this.adminloginForm.value.password;

   let adminLogin:AdminLogin={
     email,
     password
   }
     this.matchCredential(adminLogin);
    return adminLogin;
  
  }

  statusLogin:any;
  matchCredential(adminLogin){
 
   
    this._empLoginService.employeeLoginCredential(adminLogin).subscribe(
      res=>{
        console.log("Login Success",res["data"]);

        this.statusLogin=res["status"]
        let data=res["data"];
        let name=data.name;
        let id=data.id;
          console.log("Status",this.statusLogin);
          if(this.statusLogin == "OK"){
            this._empLoginService.empName=name;
            this.router.navigate(['empDashboard','empProfile',id]);
          
            
             this._adminloginSer.saveTokenToLocalStorage(id);
          }else if(this.statusLogin == "Failed"){
            console.log("Failed");
            this.statusLogin="Email or Password Incorrect";
          }
        
      },error=>{
        this.statusLogin="Bad Credential";
        console.log("error",error);
        
      }
    )
   
   }

  

}
