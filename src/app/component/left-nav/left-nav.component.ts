import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PayrollDetailsService } from 'src/app/appService/payroll-details.service';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
  styleUrls: ['./left-nav.component.css']
})
export class LeftNavComponent implements OnInit {
  @Input() show: string;
  constructor(private payrollService:PayrollDetailsService,private router:Router) { }

  salaryDetails;
  ngOnInit() {
    console.log("show hide"+this.show)
    // this.salaryDetails=JSON.parse(localStorage.getItem('SalaryStructureDetails'));
  }
  onAddPayrollData(){
    // console.log("Salary",this.salaryDetails)
    // this.payrollService.savePayrollDetails();
    // this.payrollService.getPayrollAllData=p;  
      // this.router.navigate(['dashboard','payroll']);
   // console.log("Data of Payroll",p)

  }

}
