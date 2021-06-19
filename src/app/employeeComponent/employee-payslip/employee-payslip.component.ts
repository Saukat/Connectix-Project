// import { Component, OnInit } from '@angular/core';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';
import { Component, OnInit, ElementRef ,ViewChild, OnDestroy} from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-employee-payslip',
  templateUrl: './employee-payslip.component.html',
  styleUrls: ['./employee-payslip.component.css']
})
export class EmployeePayslipComponent implements OnInit {

  constructor(private empProfileService:EmployeeProfileService,
    private employeeProfileService:EmployeeProfileService,
    private datePipe:DatePipe,
    private route:ActivatedRoute) { }
 

  empRegData;
  empSingleSal;
  empPaymentInfo;
  empPayroll;
  totalEmpFund;
  date;

  id;
  data;
  dataPayment;
  monthYear;
  // paramsSubscrib = new Subscription();
  ngOnInit() {
    // this.paramsSubscrib = this.route.params.subscribe(
    //   params=> {
            
    //   }
    // )
    
    this.monthYear=this.employeeProfileService.getMonthYear;

   console.log("Month  ==>",this.monthYear);
   
    //Date
     this.dateCal();
    // console.log("slip",this.empProfileService.email);
    // let email=this.empProfileService.email;

    this.id=this.empProfileService.id;
         
         console.log("data of id",this.id);
         
        this.empRegData=this.empProfileService.oneRecordsOfEmp;
        // console.log("Data of Reg",this.empRegData);
        
 
        //Salary one records
        this.empProfileService.getOneRecordsOfSalStructUsingId().subscribe(
          res=>{
                console.log("data of empsal",res);
                this.data=res;
               let singleEmp=this.data.filter((data,index)=>{
                        return data.id==this.id
                    }).map(res=>{
                      // console.log("data of res")
                      this.empSingleSal=res;
                      let epf=this.empSingleSal.employeeEpf
                      let esi=this.empSingleSal.employeeESI
                      this.totalEmpFund=parseFloat(epf)+parseFloat(esi);
                    })
                //  console.log("one Records",singleEmp);
 
          },error=>{
              console.log("error");
              
          }
        )

  

        //get one records of payment info
        
        this.empProfileService.getAllPayment().subscribe(
          res=>{
                // console.log("data",res);
                this.dataPayment=res;
               let singleEmp=this.dataPayment.filter((data,index)=>{
                        return data.id==this.id
                    }).map(res=>{
                      // console.log("map of payment",res)
                      this.empPaymentInfo=res;
                    })
                //  console.log("one payment Records",this.empPaymentInfo);
 
          },error=>{
              console.log("error");
              
          }
        )

 //get remark from payroll
        
 this.empProfileService.getCaledarBasedpayrollRecords(this.monthYear,this.id).subscribe(
  res=>{
        // console.log("data of allllllllllll",res);
        this.dataPayment=res;
       let singleEmp=this.dataPayment.filter((data,index)=>{
                return data.id==this.id
            }).map(res=>{
              // console.log("map of payment",res)
              this.empPayroll=res;
            })
        //  console.log("one Payroll Saukat Records",this.empPayroll);

  },error=>{
      console.log(" saukaterror");
      
  }
)


      this.dateOfRemrak();
     
  }
 numberOfDays;
dateCal(){
  let dateObj = new Date();
  let month = dateObj.getUTCMonth() -1; //months from 1-12
  let day = dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();
  let days = function(month,year) {
       return new Date(year, month, 0).getDate();
    };
this.numberOfDays=days(day,year);

}

  photo="./assets/images/connectix.jpeg";


title = 'html-to-pdf-angular-application';
public convetToPDF()
{
var data = document.getElementById('contentToConvert');
html2canvas(data).then(canvas => {
// Few necessary setting options
var imgWidth = 210;
var pageHeight = 208;
var imgHeight = canvas.height * imgWidth / canvas.width;
var heightLeft = imgHeight;
 
const contentDataURL = canvas.toDataURL('image/png')
let pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
var position = 0;
pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
pdf.save('ConnectixPaySlip.pdf'); // Generated PDF
});
}

// date;
dateOfRemrak(){
  let p=new Date();
  let mon= p.toLocaleString('default', { month: 'long'})
  // console.log(mon)
 
  // let mom= mon.toLocaleString('default', { month: 'long'})
   let years=this.datePipe.transform(p, 'yyyy');
   console.log(years);

   this.date='Pay Slip For the Month of '.concat(mon,"-",years);
   console.log(this.date)
}

// ngOnDestroy() {
//   this.paramsSubscrib.unsubscribe();
// }

}
