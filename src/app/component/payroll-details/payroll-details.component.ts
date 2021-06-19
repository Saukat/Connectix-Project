
import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { PayrollDetailsService } from 'src/app/appService/payroll-details.service';


@Component({
  selector: 'app-payroll-details',
  templateUrl: './payroll-details.component.html',
  styleUrls: ['./payroll-details.component.css']
})
export class PayrollDetailsComponent implements OnInit {
  payrollAllData:any=[]
  fetching=true;
  isDisabled=false
  noData;
  constructor(private payrollService:PayrollDetailsService,private router:Router,private datePipe:DatePipe) { }
  displayedColumns: string[] = ['name', 'monthlyCtc', 'Additions','deduction','reimbursements','netSalary','remarks', 'grossPay','status', 'edit'];
                                  
  dataSource=new MatTableDataSource(this.payrollAllData)


  //paginator
  @ViewChild(MatPaginator,{static:true}) paginator: MatPaginator;

  // //Sorting
  @ViewChild(MatSort,{static:true}) sort: MatSort;
  ngOnInit() {
    this.ctcDraft();
    this.payrollService.insertCurrentDateRecords().subscribe(
      res=>{
        //  console.log("records of current"+res);
         
      },error=>{
        // console.log("error");
      }
    )
  //  let tsts=this.payrollService.savePayrollDetails();
   
    this.dataSource.paginator = this.paginator;
    
    this.dataSource.sort = this.sort;

        // this.payrollAllData=this.payrollService.getAllPayrollDetails();
        let all=this.payrollService.getAllEmpPayrollData().subscribe(
          response=>{
           
            // console.log("res",response)
            this.payrollAllData=response;
            if(this.payrollAllData===null){
              this.fetching=false;
              this.noData="No Data Found!!";
              console.log("NO Data found");
              
            }else{
              this.fetching=false;
              console.log("Data found",this.payrollAllData);
              this.payrollAllData.map(e=>{
                if(e.status==="Final"){
                  this.isDisabled=true;
                }else{
                  this.isDisabled=false;
                }
                console.log("Map Status",e.status);
                
              })
              this.dataSource.data=this.payrollAllData
              
            }
            // console.log("dta",this.payrollAllData);
           
         
          },(error:HttpErrorResponse)=>{

            this.fetching=false;
            this.noData="No Data Found!!";
            console.log("error");
          }
        );
        console.log("Payroll data=...",this.payrollAllData);
        
        // this.payrollAllData[ipId]['name'] = value;
        // this.payrollAllData.map(s=>{
        //      s['addition']="N/A";
        //      s['deduction']="N/A";
        //      s['reimbursements']="N/A";
        //      s['remark']="Salary process for this month";

        //      return s;
        // })
        // // save data of payroll
        // console.log("Updatesss=>",this.payrollAllData);
        // this.payrollService.savePayrollDetails(this.payrollAllData);

        // this.dataSource.data=this.payrollAllData;
        //  console.log("data",this.dataSource.data);
  }

   //filter data
   applyFilter(filterValue:string){
    this.dataSource.filter=filterValue.trim().toLowerCase();
   }
    
  //edit
  editPayrollDetails(element:any){
    console.log("edit=>",element)
     this.payrollService.getPayrollAllData=element;
    //this.payrollService.editPayrollDetails(element);
    this.router.navigate(['dashboard','editPayroll'])
  }
   
   currentData;
   insertCurrentDateRecords(){
     console.log("hi");
     
      // this.payrollService.insertCurrentDateRecords().subscribe(
      //   res=>{
      //      console.log("records of current"+res);
           
      //   },error=>{
      //     console.log("error");
      //   }
      // )
   }
   payrollProcess(){
    this.router.navigate(['dashboard','payrollAll'])
   }

   final=false;

   currentSatus(){
    //  let flag=true;
    let dia= confirm("Are You Sure to Final(Once final you can't edit the Payroll)!!");
     if(dia===true){
       console.log("yes");
       
      this.payrollService.payrollStatusChanges().subscribe(
      response=>{
            this.ngOnInit(); 
      },error=>{
      //  console.log("status Error");
       this.ngOnInit();
      }
    )
     }else{
       console.log("not happend")
       this.ngOnInit();
     }
     

   
   }

   ctc;
   date(){
   let m = new Date().getMonth()+1;
    let y = new Date().getFullYear().toString();
      this.ctc=m+'-'+y;
   }


  //draft
  ctcDraft(){
    this.payrollService.getPayrollDataForTxtPrint().subscribe(
      response=>{
          console.log("Data of draft",response);
          this.payrollData(response);
      },error=>{
        console.log("Data of draft error");
      }
    )
  }


  dataforTxtfiles:any=[];
  allDataOfPayroll;
  fhrData;
  mdrData;
  str:any=[];
  totalcost=0;
  calculateTotalCompanyCostPerMonthRecords(){
    let p=this.allDataOfPayroll.map(ele=>{
      console.log("All data Payroll",ele.netSalary);
      // this.totalcost=0;
      this.totalcost+= parseFloat(ele.netSalary);
      console.log("Total Cost",this.totalcost);
      
      return this.totalcost;

  });
  }
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
    console.log("fhrData"+this.fhrData);
    
      // this.str=[null]
      for (var i = 0; i < this.dataforTxtfiles.length; i++) {
        
        this.str+=this.dataforTxtfiles[i]+'\n';
        // console.log("Strrrrrrrrr",this.str);
        
      }
      this.str=this.str.split('undefined')
      // this.fakeValidateUserData();
  }
 






//txt generate
  fakeValidateUserData() {
    
    // console.log("dataaa=>",this.str)
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
        fileName: 'Payroll-'.concat(this.monthYear),
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
    // this.router.navigate(['dashboard','allEmp']);
  
  }

  monthYear;
  dateOfSal;
  dateOfRemrak(){
    let p=new Date();
    let mon= p.toLocaleString('default', { month: 'long'})
    // console.log(mon)
   
    // let mom= mon.toLocaleString('default', { month: 'long'})
     let years=this.datePipe.transform(p, 'yyyy');
    //  console.log(years);
    this.monthYear=mon+"-"+years;
     this.dateOfSal='Salary for '.concat(this.monthYear);
    //  console.log(this.date)
  }
  
}
