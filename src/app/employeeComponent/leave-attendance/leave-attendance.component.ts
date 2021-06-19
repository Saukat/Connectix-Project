import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/appService/employee.service';
import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';
import { MailService } from 'src/app/appService/mail.service';
import { EmployeeLoginService } from 'src/app/connectixService/Employee/employee-login.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';

@Component({
  selector: 'app-leave-attendance',
  templateUrl: './leave-attendance.component.html',
  styleUrls: ['./leave-attendance.component.css']
})
export class LeaveAttendanceComponent implements OnInit {
  fetching=false;
  leaveAttendanceForm:FormGroup;
  constructor(private fb:FormBuilder,private empService:EmployeeService,
    private empProfileService:EmployeeProfileService,
    private leaveService:LeaveAttendanceService,
    private router:Router,private mailService:MailService,
    private _empLoginService:EmployeeLoginService,
    public datepipe: DatePipe,
    private sanitizer: DomSanitizer) {
   
      this.leaveAttendanceForm=fb.group({
      empId:['',Validators.required],
      title:['',Validators.required],
      subject:['',Validators.required],
      from:['',Validators.required],
      to:['',Validators.required],
      numberOfDays:['',Validators.required],
      leaveType:['',Validators.required],
      backupEmpId:['',Validators.required]
    })
   }
   empIdAndName;
   allEmpData;
   id;
   name;
  ngOnInit() {

    //id from login via service
    this.id=this.empProfileService.id;

    this.name=this._empLoginService.empName;

    this.empService.getAllEmpData().subscribe(
      response=>{
       
        this.allEmpData=response;
          console.log("All Employee Details",response);

         let p= this.allEmpData.filter((e,i,a)=>{
          console.log("data without self");
              
             return e.id!==this.id
          })
          // console.log("data without self",p);
          this.empIdAndName=p;
          console.log("HireAuth ",p)
        
      },error=>{
         console.log(error);
      }
   )
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
    console.log("replacement Name",this.replacementName);
    
    
  }
  onLeaveAttendanceForm(){
    this.fetching=true;
     let substituteId=this.leaveAttendanceForm.value.backupEmpId;
     let title=this.leaveAttendanceForm.value.title;
     let body=this.leaveAttendanceForm.value.subject;
     let subject=body+" From "+this.leaveAttendanceForm.value.from+" To "+this.leaveAttendanceForm.value.to
     +"\n"+
     "and the substitute is "+this.replacementName
     +"\n"+"\n"+"Thanks & Regards"+"\n"+this.name;
     console.log("Subject",subject)
    //mail sending function
    this.hirerAuthMailsending(subject,title);
    this.substituteMailsending(substituteId,subject,title);


    console.log(this.leaveAttendanceForm.value)
    this.leaveService.saveLeaveInfo(this.leaveAttendanceForm.value).subscribe(
      response=>{
         console.log("Save",response)
         this.fetching=false;
        this.router.navigate(['empDashboard','viewLeave']);
      },error=>{
        console.log("Save",error)
      }
    )

  }

  hirerAuthMailsending(subject,title){
    this.mailService.hirerAuthMailsending(this.id).subscribe(
      response=>{
        let email=response["email"];
        console.log("Hiher Auth Data",email);

        const mailOptions = {
          to: `${email}`,
          subject: `${title}`,
          // message: `${subject}`+ this.sanitizer.bypassSecurityTrustHtml('<a href="http://localhost:4200/adminLogin">Please check Payroll Account</a>"')
          message: `${subject}`
        };
        console.log("AMa=>",mailOptions);

        this.mailService.mailSending(mailOptions).subscribe(
          response=>{
               console.log(response);
               
          },error=>{
            console.log("error");
          }
        )

         
      },error=>{
        console.log("error");
      }
    )
           
  }

  substituteMailsending(substituteId,subject,title){

    this.mailService.substituteMailsending(substituteId).subscribe(
      response=>{
        //  console.log("substitute Mail sending",response);
         let email=response["email"];
        console.log("substitute Data",email);

        const mailOptions = {
          to: `${email}`,
          subject: `${title}`,
          // message: `${subject}`+ this.sanitizer.bypassSecurityTrustHtml('<a href="http://localhost:4200/adminLogin">Please check Payroll Account</a>"')
          message: `${subject}`
        };
        // console.log("AMa=>",mailOptions);

        this.mailService.mailSending(mailOptions).subscribe(
          response=>{
               console.log("Substitute Mail sending",response);
               
          },error=>{
            console.log("error subst.");
          }
        )
         
      },error=>{
        console.log("error");
      }
    )
  }

  from;
  flag=false;
  fromDate(event){
    this.from=event.target.value;
   
    // this.from=event.target.value;
    // let array = this.from.split("-").map(Number);
    // this.from=array[2];
    // console.log(array[2]);
    if(this.flag==true){
      // this.totalDayLeave=(this.to-this.from)+1;
      // console.log(this.totalDayLeave)

      let date1 = new Date(this.from);  
      let date2 = new Date(this.to);  
      console.log("from",date1)
      console.log("to",date2);
      let time_difference = date2.getTime() - date1.getTime(); 
      let days_difference = time_difference / (1000 * 60 * 60 * 24); 
      console.log("Diffrence",(days_difference)+1);  

      this.totalDayLeave=days_difference+1;
    }
  }

  to
  totalDayLeave;
  tim
  toDate(event){
    this.to=event.target.value;
    console.log("from",this.from)
    console.log("to",this.to);
    // let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
   
    // let array = this.to.split("-").map(Number);
    // this.to=array[2];
    // console.log(array[2]);
    // if(isNaN(this.from)){
    //   this.flag=true;
    //   alert("plz fill From Date")
    // }else{


      let date1 = new Date(this.from);  
      let date2 = new Date(this.to);  
      console.log("from",date1)
      console.log("to",date2);
      let time_difference = date2.getTime() - date1.getTime(); 
      let days_difference = time_difference / (1000 * 60 * 60 * 24); 
      console.log("Diffrence",(days_difference)+1);  

      // this.totalDayLeave=days_difference+1;
      // console.log(this.totalDayLeave)
    // }
    if(isNaN(days_difference)){
         this.flag=true;
        alert("plz fill From Date")
    }else{
      this.totalDayLeave=days_difference+1;
      console.log(this.totalDayLeave)
    }
  }
}
