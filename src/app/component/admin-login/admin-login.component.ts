import { HttpErrorResponse } from '@angular/common/http';
import { identifierModuleUrl, IfStmt, ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { parse } from 'querystring';
import { AdminLoginService } from 'src/app/appService/admin-login.service';
import { ConAdminLoginService } from 'src/app/connectixService/Admin/con-admin-login.service';
import { EmployeeLoginService } from 'src/app/connectixService/Employee/employee-login.service';
import { AdminLogin } from 'src/app/models/admin-login';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  fetching=false; 
  islogin:any=true;
  status;
  adminData
  adminloginForm:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,
    private adminloginService:AdminLoginService,
    private _adminloginSer:ConAdminLoginService,
    private _empLoginService:EmployeeLoginService,
    private router:Router) { 
    this.adminloginForm=fb.group({  //group the whole data into formLogicalName object
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
   })
  }
  ngOnInit() {
            this.adminData=this.adminloginService.adminData;
       
  }
  
  ddlVal
  onOptionsSelected(value){
    this.ddlVal=value
      // console.log("ddl",this.ddlVal);
      
  }


  //onSubmit data
  onLoginForm(){
    this.fetching=true

   let email=this.adminloginForm.value.email;
   let password=this.adminloginForm.value.password;

   let adminLogin:AdminLogin={
     email,
     password
   }
     this.matchCredential(adminLogin);
    return adminLogin;
  
   
    //console.log("side:::",this.islogin);
  }

  statusLogin:any;
  matchCredential(adminLogin){
      // console.log(this.adminloginForm.value);
  if(this.ddlVal == "1"){
    // console.log("admin")
    

    let p:any=[];
  
     this._adminloginSer.adminCredential(adminLogin).subscribe(
     response=>{
            // let data=response.message;
            console.log("message 11",response)
           
          this.statusLogin=response["status"];
          console.log("status login",this.statusLogin)
          let data=response["data"];
         
          // console.log("Status",this.statusLogin);
          if(this.statusLogin == "OK"){
            this.fetching=false
            let id=data.id;
            this.router.navigate(['dashboard'])
             let token=id;
            
            this._adminloginSer.saveTokenToLocalStorage(token);
            // console.log("Login with token",response["result"])
            
          }else if(this.statusLogin === "Failed"){
            // this.fetching=false
            console.log(this.statusLogin+"dl");
            
            this.fetching=false;
            this.status="Email or Password Incorrect";
            // console.log("Failed");
          }
           
   
        
     },error=>{
         this.fetching=false
         this.status="500 Server Side problem";
              // console.log("Error",error)
     }
   )
      
    
   }
   else if(this.ddlVal == "2"){
    this._empLoginService.employeeLoginCredential(adminLogin).subscribe(
      res=>{
        // console.log("Login Success",res["data"]);

        this.statusLogin=res["status"]
        let data=res["data"];
        let name=data.name;
        
          // console.log("Status",this.statusLogin);
          if(this.statusLogin == "OK"){
            let id=data.id;
            this.fetching=false
            this._empLoginService.empName=name;
            this.router.navigate(['empDashboard','empProfile',id]);
          
            
             this._adminloginSer.saveTokenToLocalStorage(id);
          }else if(this.statusLogin == "Failed"){
            this.fetching=false
            console.log("Failed");
            this.status="Email or Password Incorrect";
          }
        
      },error=>{
        this.fetching=false
        this.status="Bad Credential";
        console.log("error",error);
        
      }
    )
   
   }else{
    this.fetching=false
    this.status="Please Choose User Type";
      //  console.log("error")
   }
  

  }





  login(){
    this.router.navigate(['employeeLogin'])
  }


  onForgotPassword(){
    this.router.navigate(['forgotPassword'])
  }
}
