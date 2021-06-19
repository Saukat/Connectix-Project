import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PayrollDetailsService } from 'src/app/appService/payroll-details.service';
import { ReimbursementService } from 'src/app/appService/reimbursement.service';

@Component({
  selector: 'app-reimbursement-report',
  templateUrl: './reimbursement-report.component.html',
  styleUrls: ['./reimbursement-report.component.css']
})
export class ReimbursementReportComponent implements OnInit {

  allDataOfPayroll;
  fetching=true;
  noData;
  // payrollReportForm:FormGroup;
  constructor(private payrollService:PayrollDetailsService,private datePipe:DatePipe,
    private fb:FormBuilder,private reimService:ReimbursementService,private router:Router) { 
    // this.payrollReportForm=fb.group({
    //   salaryMonth:['']
    // })
  }
 
  
 


  dataforTxtfile:any=[];
  fhrData;
  mdrData;
  str:any=[];
  
  date;
  totalcost:any=0;
  ngOnInit() {
    // this.fetching=false
    // this.noData="Please Select Month And Year"
    
   
    // console.log("data",this.mdrData)
    let recordsCount=0;
     
     this.reimService.getAllReimForText().subscribe(
       res=>{
        this.fetching=false;
         console.log("data of payroll",res);
         this.allDataOfPayroll=res;
         this.allDataOfPayroll.map((ele,ind,arr)=>{
          recordsCount=arr.length+1;
           
                             
          this.dataforTxtfile[ind]='MCW'.concat('|',ele.accNo,'|','0011','|',ele.name,'|',
                                    ele.amount,'|','INR','|',ele.salaryMonth,
                                    '|',ele.ifscCode,'|','WIB^');
         
         
        
          return this.dataforTxtfile;
      },error=>{
               
      }
      )

      this.calculateTotalCompanyCost();
      this.dateOfRemrak();


    let date = new Date();

    const cValue =((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' +
    ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();

     

      this.fhrData='FHR|'.concat(recordsCount+'|'+cValue+'|Cut-off|'+this.totalcost+'|INR|006105027372|0011^')
      this.mdrData='MDR|006105027372|0011|570518395|'.concat(this.totalcost+'|INR|',this.allDataOfPayroll[0].salaryMonth,'|ICIC0000011|WIB^')
      
      for (var i = 0; i < this.dataforTxtfile.length; i++) {
        this.str+=this.dataforTxtfile[i]+'\n';
      }
      this.str=this.str.split('undefined')
       },error=>{
        this.fetching=false;
        this.noData="No Data Found!!";
         console.log("error");
         
       }
     )
       
 
    
   
  }

    



  //Company total cost
  calculateTotalCompanyCost(){
      //  console.log("total",this.allDataOfPayroll);
       let p=this.allDataOfPayroll.map(ele=>{
           this.totalcost+= parseFloat(ele.amount);
           
           return this.totalcost;

       });
      //  console.log("Total Cost:",this.totalcost)
     
  }

  // date;
  monthYear;
  dateOfRemrak(){
    let p=new Date();
    let mon= p.toLocaleString('default', { month: 'long'})
    // console.log(mon)
   
    // let mom= mon.toLocaleString('default', { month: 'long'})
     let years=this.datePipe.transform(p, 'yyyy');
    //  console.log(years);
    this.monthYear=mon+"-"+years;
     this.date='Salary for '.concat(this.monthYear);
    //  console.log(this.date)
  }
  

  
  dataforTxtfiles:any=[];
  payrollData(response){
    let recordsCount=0;
    this.allDataOfPayroll=response;
     console.log("records",this.allDataOfPayroll);
     
    this.allDataOfPayroll.map((ele,ind,arr)=>{
     recordsCount=arr.length+1;
      
    //  this.dataforTxtfile=;
                        
     this.dataforTxtfiles[ind]='MCW'.concat('|',ele.accNo,'|','0011','|',ele.name,'|',
                               ele.netSalary,'|','INR','|',ele.remark,
                               '|','ICIC0000011','|','WIB^');
    
     console.log("Payroll marchhhh ",this.dataforTxtfiles);
     return this.dataforTxtfiles;
    })

    this.calculateTotalCompanyCostPerMonthRecords();
      this.dateOfRemrak();


    let date = new Date();

    //  const cValue = formatDate(currentDate, 'MM/dd/yyyy', 'en-US');
    //  var date = new Date('2010-10-11T00:00:00+05:30');
    const cValue =((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' +
    ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
    //  console.log("Date of current",cValue);
     

      this.fhrData='FHR|'.concat(recordsCount+'|'+cValue+'|Cut-off|'+this.totalcost+'|INR|006105027372|0011^')
      this.mdrData='MDR|006105027372|0011|570518395|'.concat(this.totalcost+'|INR|',this.allDataOfPayroll[0].remark,'|ICIC0000011|WIB^')
      this.str=[null]
      for (var i = 0; i < this.dataforTxtfiles.length; i++) {
        
        this.str+=this.dataforTxtfiles[i]+'\n';
        console.log("Strrrrrrrrr",this.str);
        
      }
      this.str=this.str.split('undefined')
      // this.fakeValidateUserData();
  }
  calculateTotalCompanyCostPerMonthRecords(){
    let p=this.allDataOfPayroll.map(ele=>{
      console.log("All data Payroll",ele.netSalary);
      // this.totalcost=0;
      this.totalcost+= parseFloat(ele.netSalary);
      console.log("Total Cost",this.totalcost);
      
      return this.totalcost;

  });
  }






//txt generate
  fakeValidateUserData() {
    
    console.log("dataaa=>",this.str)
    return of({
      a:this.fhrData,
      b:this.mdrData,
      c:this.str
    });
  }

  private setting = {
    element: {
      dynamicDownload: null as HTMLElement
    }
  }



  dynamicDownloadTxt() {
    // this.ngOnDestroy();
    this.fakeValidateUserData()
    .subscribe((res) => {
      this.dyanmicDownloadByHtmlTag({
        fileName: 'Payroll-',
        fhr:res.a,
        mdr:res.b,
        emp:res.c
        
        
      });
    });

  }
  private dyanmicDownloadByHtmlTag(arg: {
    fileName: string,
    fhr: string,
    mdr:string,
    emp:string
  }) {
    if (!this.setting.element.dynamicDownload) {
      this.setting.element.dynamicDownload = document.createElement('a');
    }
    const element = this.setting.element.dynamicDownload;
    const fileType = arg.fileName.indexOf('.json') > -1 ? 'text/json' : 'text/plain';
    element.setAttribute('href', `data:${fileType};charset=utf-8,${encodeURIComponent(arg.fhr)}\n${encodeURIComponent(arg.mdr)}\n${encodeURIComponent(arg.emp)}`);
    element.setAttribute('download', arg.fileName);

    var event = new MouseEvent("click");
    element.dispatchEvent(event);
    this.router.navigate(['dashboard','allEmp']);
  
  }


  ngOnChanges(): void {
    // this.onPayrollReportForm();
  }
  ngOnDestroy(): void {
   
  }
}












