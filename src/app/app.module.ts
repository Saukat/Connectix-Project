import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeRegisterComponent } from './component/employee-register/employee-register.component';
import { AllEmployeesListComponent } from './component/all-employees-list/all-employees-list.component';
import { SingleEmpDetailsComponent } from './component/single-emp-details/single-emp-details.component';
import { EditEmployeeComponent } from './component/edit-employee/edit-employee.component';
import { HttpClientModule } from '@angular/common/http';
import { LeftNavComponent } from './component/left-nav/left-nav.component';
import { HeaderComponent } from './component/header/header.component';
import { DashboardBodyInfoComponent } from './component/dashboard-body-info/dashboard-body-info.component';


import { OtherInformationComponent } from './component/other-information/other-information.component';
import { EditOtherInformationComponent } from './component/edit-other-information/edit-other-information.component';
import { ProvidentFundComponent } from './component/provident-fund/provident-fund.component';
import { EditProvidentFundComponent } from './component/edit-provident-fund/edit-provident-fund.component';
import { PaymentInfoComponent } from './component/payment-info/payment-info.component';
import { EditPaymentInfoComponent } from './component/edit-payment-info/edit-payment-info.component';
import { FiscalYearComponent } from './component/fiscal-year/fiscal-year.component';
import { EditFiscalYearComponent } from './component/edit-fiscal-year/edit-fiscal-year.component';
import { SalaryStructureComponent } from './component/salary-structure/salary-structure.component';
import { EditSalaryStructureComponent } from './component/edit-salary-structure/edit-salary-structure.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { PayrollDetailsComponent } from './component/payroll-details/payroll-details.component';
import { EditPayrollDetailsComponent } from './component/edit-payroll-details/edit-payroll-details.component';
import { DatePipe, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PayrollAllDetailsComponent } from './component/payroll-all-details/payroll-all-details.component';
import { EmployeeDashboardComponent } from './employeeComponent/employee-dashboard/employee-dashboard.component';
import { EmployeeProfileComponent } from './employeeComponent/employee-profile/employee-profile.component';
import { EmployeePayslipComponent } from './employeeComponent/employee-payslip/employee-payslip.component';
import { ResetAdminPasswordComponent } from './component/reset-admin-password/reset-admin-password.component';
import {AuthGuard} from './auth.guard';
import { EmployeeLoginComponent } from './employeeComponent/employee-login/employee-login.component';
import { LeaveAttendanceComponent } from './employeeComponent/leave-attendance/leave-attendance.component';
import { ViewLeaveComponent } from './employeeComponent/view-leave/view-leave.component';
import { SingleLeaveViewComponent } from './employeeComponent/single-leave-view/single-leave-view.component';
import { LeaveApprovalListComponent } from './employeeComponent/leave-approval-list/leave-approval-list.component';
import { SingleApprovalViewComponent } from './employeeComponent/single-approval-view/single-approval-view.component'

import { SubstituteComponent } from './employeeComponent/substitute/substitute.component';
import { SingleSubstituteDetailsComponent } from './employeeComponent/single-substitute-details/single-substitute-details.component';
import { EmployeeResetPasswordComponent } from './employeeComponent/employee-reset-password/employee-reset-password.component';
import { AdminLeaveApprovalComponent } from './component/admin-leave-approval/admin-leave-approval.component';
import { AdminApprovalSingleComponent } from './component/admin-approval-single/admin-approval-single.component';
import { AttendanceComponent } from './component/attendance/attendance.component';
import { EditAttendanceComponent } from './component/edit-attendance/edit-attendance.component';
import { ListLeaveComponent } from './component/list-leave/list-leave.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ReimbursementComponent } from './employeeComponent/reimbursement/reimbursement.component';
import { TaskComponent } from './employeeComponent/task/task.component';
import { TaskListComponent } from './employeeComponent/task-list/task-list.component';
import { EditTaskComponent } from './employeeComponent/edit-task/edit-task.component';
import { TaskEmpComponent } from './employeeComponent/task-emp/task-emp.component';
import { TaskEmpResponseComponent } from './employeeComponent/task-emp-response/task-emp-response.component';
import { ReimbListComponent } from './employeeComponent/reimb-list/reimb-list.component';
import { ReimbRequestListComponent } from './employeeComponent/reimb-request-list/reimb-request-list.component';
import { EditReimComponent } from './employeeComponent/edit-reim/edit-reim.component';
import { ReimApprovalComponent } from './employeeComponent/reim-approval/reim-approval.component';
import { TaskAddEmployeeComponent } from './employeeComponent/task-add-employee/task-add-employee.component';
import { AllTaskListComponent } from './component/all-task-list/all-task-list.component';
import { ReimbursementRequestComponent } from './component/reimbursement-request/reimbursement-request.component';
import { ReimbursementApprovalComponent } from './component/reimbursement-approval/reimbursement-approval.component';
import { ReimbursementReportComponent } from './component/reimbursement-report/reimbursement-report.component';
import { ReimbursementListComponent } from './component/reimbursement-list/reimbursement-list.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    DashboardComponent,
    EmployeeRegisterComponent,
    AllEmployeesListComponent,
    SingleEmpDetailsComponent,
    EditEmployeeComponent,
    LeftNavComponent,
    HeaderComponent,
    DashboardBodyInfoComponent,
  
  
    OtherInformationComponent,
    EditOtherInformationComponent,
    ProvidentFundComponent,
    EditProvidentFundComponent,
    PaymentInfoComponent,
    EditPaymentInfoComponent,
    FiscalYearComponent,
    EditFiscalYearComponent,
    SalaryStructureComponent,
    EditSalaryStructureComponent,
    PayrollDetailsComponent,
    EditPayrollDetailsComponent,
    PayrollAllDetailsComponent,
    EmployeeDashboardComponent,
    EmployeeProfileComponent,
    EmployeePayslipComponent,
    ResetAdminPasswordComponent,
    EmployeeLoginComponent,
    LeaveAttendanceComponent,
    ViewLeaveComponent,
    SingleLeaveViewComponent,
    LeaveApprovalListComponent,
    SingleApprovalViewComponent,
    SubstituteComponent,
    SingleSubstituteDetailsComponent,
    EmployeeResetPasswordComponent,
    AdminLeaveApprovalComponent,
    AdminApprovalSingleComponent,
    AttendanceComponent,
    EditAttendanceComponent,
    ListLeaveComponent,
    ForgotPasswordComponent,
    ReimbursementComponent,
    TaskComponent,
    TaskListComponent,
    EditTaskComponent,
    TaskEmpComponent,
    TaskEmpResponseComponent,
    ReimbListComponent,
    ReimbRequestListComponent,
    EditReimComponent,
    ReimApprovalComponent,
    TaskAddEmployeeComponent,
    AllTaskListComponent,
    ReimbursementRequestComponent,
    ReimbursementApprovalComponent,
    ReimbursementReportComponent,
    ReimbursementListComponent,

  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
  
    
  ],
  providers: [DatePipe,AuthGuard,{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
