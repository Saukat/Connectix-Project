import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  // people=new Subject<boolean>();
  constructor(private router:Router) { }

  adminData:any=[
   { 
     "email":"admin@gmail.com",
     "password":"admin"
   },
  ];


  
// Check ccredential of Admin 
booleanValue;
  adminLoginCredential(admin){
    this.booleanValue = this.adminData.some((data) => {
    return data.email === admin.email && data.password === admin.password 
        
   })
  // console.log(booleanValue);
   if(this.booleanValue){
    //  console.log("suucess")
      this.router.navigate(['dashboard'])
    
   }else{
      console.log("failed");
   }
   return this.booleanValue;
  }

  //Check credential of Employee 
  booleanVal;
 employeeCredential(employee){

     let empData=JSON.parse(localStorage.getItem('EmployeesRegisterData'))
    
    this.booleanVal = empData.some((data) => {
    return data.email === employee.email && data.name === employee.password 
        
   })
  // console.log(booleanValue);
   if(this.booleanVal){
        console.log("suucess")
      this.router.navigate(['empDashboard','empProfile',employee.email])
    
   }else{
      console.log("failed");
   }
   return this.booleanVal;
  }
}
