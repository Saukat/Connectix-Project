import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { observable, Observable, Subscriber } from 'rxjs';
import { EmployeeService } from 'src/app/appService/employee.service';
import { MailService } from 'src/app/appService/mail.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  myimage: Observable<any>;
  newBaseUrl;
  employee:any={}
  linkLogin
  empIdAndName;
  adminIdAndName;
  employeeRegForm:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private empService:EmployeeService,
    private mailService:MailService,
    private router:Router,private elementRef:ElementRef) { 
    this.employeeRegForm=fb.group({  //group the whole data into formLogicalName object
      employeeId:['',Validators.required],
      // title:[''],
      name:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      hireDate:['',Validators.required],
      jobTitle:['',Validators.required],
      location:['',Validators.required],
      department:['',Validators.required],
      rollType:['',Validators.required],
      gender:['',Validators.required],
      reportHighAuth:['',Validators.required]
   })


  
  }
  
  ngOnInit() {
   
    
    this.empService.getAllEmpData().subscribe(
       response=>{
         this.empIdAndName=response;
           console.log("plo",response)
       },error=>{
          console.log(error);
       }
    )

    this.empService.getAllAdminData().subscribe(
      response=>{
        this.adminIdAndName=response;
          console.log("plo",response)
      },error=>{
         console.log(error);
      }
   )

  }
 
   
   photo="./assets/images/profile.jpg";
   onEmployeeRegForm(){



    let employeeId=this.employeeRegForm.value.employeeId;
    // let title=this.employeeRegForm.value.title;
    let name=this.employeeRegForm.value.name;
    let email=this.employeeRegForm.value.email;
    let hireDate=this.employeeRegForm.value.hireDate;
    let jobTitle=this.employeeRegForm.value.jobTitle;
    let location=this.employeeRegForm.value.location;
    let department=this.employeeRegForm.value.department;
    let rollType=this.employeeRegForm.value.rollType;
    let gender=this.employeeRegForm.value.gender;
    let reportHighAuth=this.employeeRegForm.value.reportHighAuth;
     //asign Base64 data int photo
     let photo=this.employeeRegForm.value["photo"]=this.image;
        this.photo=photo
  
    let employee:Employee={
      employeeId,
      // title,
      name,
      email,
      hireDate,
      jobTitle,
      location,
      department,
      rollType,
      gender,
      photo,
      reportHighAuth
     

       
    }
   // console.log("Register Data:"+JSON.stringify(employee)); 
    this.saveEmployee(employee);
    return employee;

     
  }



islogin=true
status;
  saveEmployee(emp){

    console.log(emp)
     // this.employee=Object.assign(this.employee,emp);
     // this.empService.addEmployee(emp);
     let to=emp.email;
     let subject="Welcome to Connectix !!";
    //  
     let message="Dear "+emp.name+","+"\n"+"Your login User Id is "+emp.email+" And Password is cntx@123 and Employee Id "+emp.employeeId;
    // this.elementRef.nativeElement.appendChild(this.linkLogin);

    //  this.elementRef.nativeElement.innerHTML="<a href='http://localhost:4200/adminLogin'>Please Login</a>";
     
     this.empService.saveEmployee(emp).subscribe(
       response=>{
         console.log("success"+response);
         
         this.mailsendingToEmployee(to,subject,message);

         this.router.navigate(['dashboard','allEmp']);
       },error=>{
          if(error.error==="Already Email Id already exists"){
              console.log("Email id",error.error);
              this.islogin=false
              this.status=error.error
          }else if(error.error==="Already Employee Id already exists"){
            console.log("Employee id",error.error);
            this.islogin=false
            this.status=error.error
          }else{
            console.log("Error");
            this.islogin=false
            this.status="Internal Server Probelm"
          }
        //  console.log("error",error.error);
        
       }
     )
     
    
  }

  mailsendingToEmployee(to,subject,message){
    const mailOptions = {
      to: `${to}`,
      subject: `${subject}`,
      // message: `${subject}`+ this.sanitizer.bypassSecurityTrustHtml('<a href="http://localhost:4200/adminLogin">Please check Payroll Account</a>"')
      message: `${message}`
    };
    // console.log("AMa=>",mailOptions);

    this.mailService.mailSending(mailOptions).subscribe(
      response=>{
           console.log("Mail sending to Employee",response);
           
      },error=>{
        console.log("error subst.");
      }
    )
  }
 
  
  
  
  // url="./assets/images/profile.jpg";
  // selectedImage:any=null;
//conevrt into base64
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
