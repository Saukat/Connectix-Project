import { JsonPipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { pipe, throwError} from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { EmployeeService } from 'src/app/appService/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  id;
  singleData;
  employeeRegForm:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private empService:EmployeeService,private location:Location) { 
    this.employeeRegForm=fb.group({  //group the whole data into formLogicalName object
      id:[''],
      employeeId:['',Validators.required],
      // title:[''],
      name:['',Validators.required],
      password:[''],
      email:['',[Validators.required,Validators.email]],
      hireDate:['',Validators.required],
      jobTitle:['',Validators.required],
      location:['',Validators.required],
      department:['',Validators.required],
      rollType:['',Validators.required],
      status:['',Validators.required],
      gender:['',Validators.required],
      reportHighAuth:['',Validators.required]
      // photo:[null]

      // :[''],
   })
  }
 
photo;
reportHigherAuth;
empIdAndName;
adminIdAndName;
authorityData:any;
  ngOnInit() {
    // debugger;
      this.singleData=this.empService.editData  //get Data from empService of editData
      // console.log("emp::",this.singleData);

      this.photo=this.singleData.photo;

   
      //patch value into form
      this.employeeRegForm.patchValue({

        id: this.singleData.id,
        employeeId: this.singleData.employeeId,
        // title:this.singleData.title,
        name:this.singleData.name,
        email: this.singleData.email,
        password:this.singleData.password,
        hireDate:this.singleData.hireDate,
        jobTitle:this.singleData.jobTitle,
        location: this.singleData.location,
        department:this.singleData.department,
        rollType:this.singleData.rollType,
        status:this.singleData.status,
        gender:this.singleData.gender,
        reportHighAuth:this.singleData.reportHighAuth, 
        // photo:this.singleData.photo
       
       
      })

      this.reportHigherAuth=this.employeeRegForm.value.reportHighAuth;

       this.empService.getAllEmpData().subscribe(
       response=>{
         this.empIdAndName=Object.values(response);
          //  console.log("plo",response)
       },error=>{
          console.log(error);
       }
    )

    this.empService.getAllAdminData().subscribe(
      response=>{
        this.adminIdAndName=Object.values(response);
          // console.log("admin 1",response)
      },error=>{
         console.log("error1");
      }
   )

   this.empService.getOneAdminData(this.reportHigherAuth).subscribe(
    response=>{
      this.adminIdAndName=Object.values(response);
      this.authorityData=this.adminIdAndName.email;
        // console.log("plo 1st data",response)
    }, err => console.log("error"),

     ()=> this.empService.getSingleEmployee(this.reportHigherAuth).subscribe(
        response=>{
          this.adminIdAndName= Object.values(response);
          this.authorityData=this.adminIdAndName.name;
            // console.log("plo 2nd emmployee",this.authorityData)
        },error=>{
              console.log("Erroe of last")
        }
      )
       
    
  )


   
  }
  onEditEmployeeRegForm(){
    console.log("Images",this.employeeRegForm.value["photo"])
      //asign Base64 data int employeeRegForm
     
      if(this.employeeRegForm.value["photo"] ===undefined){
        console.log("Not Present");
        
        this.employeeRegForm.value["photo"]=this.photo;
        console.log("Images Present");
        this.empService.updateEmployeeInfo(this.employeeRegForm.value).subscribe(
          response=>{
              // console.log("Employee Records",response);
              this.location.back();
          },error=>{
              console.log("error");
              
          }
        )
      }else{
        console.log("Present");
        
        this.employeeRegForm.value["photo"]=this.image;
        console.log("Images Present");
        this.empService.updateEmployeeInfo(this.employeeRegForm.value).subscribe(
          response=>{
              // console.log("Employee Records",response);
              this.location.back();
          },error=>{
              console.log("error");
              
          }
        )
      }
      // console.log("data  updated val",this.employeeRegForm.value);
       
      

      
      //  let employees=JSON.parse(localStorage.getItem('EmployeesRegisterData'))
      //    for (var i = 0; i < employees.length; ++i) {
      //       if (employees[i].id === this.employeeRegForm.value.id) {
      //         employees[i] = this.employeeRegForm.value;
      //         localStorage.setItem('EmployeesRegisterData',JSON.stringify(employees))
      //       }
      //     }
      //     console.log("emp Data:",employees);
      //     this.location.back();
          

  
  }




//convert base64
image;
onFileSelected($event) : void {
  this.readThis($event.target);
 
}

readThis(inputValue: any): void {
  var file:File = inputValue.files[0];
  
  var myReader:FileReader = new FileReader();

  myReader.onloadend = (e) => {
    this.image = myReader.result;
    this.photo=this.image
   
  }
  myReader.readAsDataURL(file);
 
}



}
