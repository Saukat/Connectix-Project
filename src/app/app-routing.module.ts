import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AdminLoginComponent } from './component/admin-login/admin-login.component';
import { AllEmployeesListComponent } from './component/all-employees-list/all-employees-list.component';
import { DashboardBodyInfoComponent } from './component/dashboard-body-info/dashboard-body-info.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { EditEmployeeComponent } from './component/edit-employee/edit-employee.component';
import { EditFiscalYearComponent } from './component/edit-fiscal-year/edit-fiscal-year.component';
import { EditOtherInformationComponent } from './component/edit-other-information/edit-other-information.component';
import { EditPaymentInfoComponent } from './component/edit-payment-info/edit-payment-info.component';
import { EditPayrollDetailsComponent } from './component/edit-payroll-details/edit-payroll-details.component';
import { EditProvidentFundComponent } from './component/edit-provident-fund/edit-provident-fund.component';
import { EditSalaryStructureComponent } from './component/edit-salary-structure/edit-salary-structure.component';

import { EmployeeRegisterComponent } from './component/employee-register/employee-register.component';
import { FiscalYearComponent } from './component/fiscal-year/fiscal-year.component';
import { LeaveAttendanceComponent } from './employeeComponent/leave-attendance/leave-attendance.component';
import { OtherInformationComponent } from './component/other-information/other-information.component';
import { PaymentInfoComponent } from './component/payment-info/payment-info.component';
import { PayrollAllDetailsComponent } from './component/payroll-all-details/payroll-all-details.component';
import { PayrollDetailsComponent } from './component/payroll-details/payroll-details.component';
import { ProvidentFundComponent } from './component/provident-fund/provident-fund.component';
import { ResetAdminPasswordComponent } from './component/reset-admin-password/reset-admin-password.component';
import { SalaryStructureComponent } from './component/salary-structure/salary-structure.component';
import { SingleEmpDetailsComponent } from './component/single-emp-details/single-emp-details.component';
import { EmployeeDashboardComponent } from './employeeComponent/employee-dashboard/employee-dashboard.component';
import { EmployeeLoginComponent } from './employeeComponent/employee-login/employee-login.component';
import { EmployeePayslipComponent } from './employeeComponent/employee-payslip/employee-payslip.component';
import { EmployeeProfileComponent } from './employeeComponent/employee-profile/employee-profile.component';
import { ViewLeaveComponent } from './employeeComponent/view-leave/view-leave.component';
import { SingleLeaveViewComponent } from './employeeComponent/single-leave-view/single-leave-view.component';
import { LeaveApprovalListComponent } from './employeeComponent/leave-approval-list/leave-approval-list.component';
import { SingleApprovalViewComponent } from './employeeComponent/single-approval-view/single-approval-view.component';
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


const routes: Routes = [
  // {path:'',redirectTo:'adminLogin',pathMatch:'full'},
  // {path:'adminLogin',component:AdminLoginComponent},
  // {path:'dashboard',component:DashboardComponent},
  // {path:'employee-register',component:EmployeeRegisterComponent},
  // {path:'one/:id',component:SingleEmpDetailsComponent},
  // {path:'update',component:EditEmployeeComponent},


  {path:'',redirectTo:'adminLogin',pathMatch:'full'},
  {path:'adminLogin', component:  AdminLoginComponent},
  {path:'employeeLogin',component:EmployeeLoginComponent},
  {path:'forgotPassword',component:ForgotPasswordComponent},
  
  {path:'empDashboard',component:EmployeeDashboardComponent,
     children:[

      // {path:'',redirectTo:'empProfile',pathMatch:'full'},
      // {path:'empProfil',component:EmployeeProfileComponent},

      // {path:'empProfile/:email',component:EmployeeProfileComponent},
      {path:'empProfile/:id',component:EmployeeProfileComponent},

      {path:'empPaySlip',component:EmployeePayslipComponent},

      {path:'leave',component:LeaveAttendanceComponent},
      
      {path:'viewLeave',component:ViewLeaveComponent},

      {path:'viewSingleLeave',component:SingleLeaveViewComponent},

      {path:'leaveApprove',component:LeaveApprovalListComponent},

      {path:'viewSingleApproval',component:SingleApprovalViewComponent},

      {path:'substitute',component:SubstituteComponent},

      {path:'viewSubstitute',component:SingleSubstituteDetailsComponent},

      {path:'resetPassword',component:EmployeeResetPasswordComponent},
    
      {path:'reimbursement',component:ReimbursementComponent},

      {path:'reimList',component:ReimbListComponent},

      {path:'reimRequest',component:ReimbRequestListComponent},

      {path:'editReim',component:EditReimComponent},

      {path:'reimApproval',component:ReimApprovalComponent},



      {path:'task',component:TaskComponent},
    
      {path:'taskList',component:TaskListComponent},

      {path:'employeeAddTask',component:TaskAddEmployeeComponent},



      {path:'editTask',component:EditTaskComponent},

      {path:'empTask',component:TaskEmpComponent},

      {path:'viewTask',component:TaskEmpResponseComponent},

     ],
     canActivate:[AuthGuard]
  },
 
  

  {path:'dashboard',component: DashboardComponent,
     children:[
      { path:'',component:DashboardBodyInfoComponent},
      { path:'employee-register',component:EmployeeRegisterComponent},
      {path:'allEmp',component:AllEmployeesListComponent},
     

      {path:'one/:id',component:SingleEmpDetailsComponent},
      {path:'update',component:EditEmployeeComponent},

      {path:'otherInfo/:id',component:OtherInformationComponent},
      {path:'editOtherInfo',component:EditOtherInformationComponent},

      {path:'providentFund/:id',component:ProvidentFundComponent},
      {path:'EditprovidentFund',component:EditProvidentFundComponent},

      {path:'paymentInfo/:id',component:PaymentInfoComponent},
      {path:'editPaymentInfo',component:EditPaymentInfoComponent},

      {path:'fiscalYear/:id',component:FiscalYearComponent},
      {path:'editFiscalYear',component:EditFiscalYearComponent},

      {path:'salaryStructure/:id',component:SalaryStructureComponent},
      {path:'editsalaryStructure',component:EditSalaryStructureComponent},

      {path:'payroll',component:PayrollDetailsComponent},
      {path:'editPayroll',component:EditPayrollDetailsComponent},
 
      {path:'payrollAll',component:PayrollAllDetailsComponent},

      {path:'resetPassword',component:ResetAdminPasswordComponent},

      {path:'adminLeaveApproval',component:AdminLeaveApprovalComponent},

      {path:'adminViewApproval',component:AdminApprovalSingleComponent},

      {path:'attendance/:id',component:AttendanceComponent},

      {path:'editAttendance',component:EditAttendanceComponent},

      {path:'leaveList',component:ListLeaveComponent},

      {path:'taskList',component:AllTaskListComponent},

      {path:'reimbRequest',component:ReimbursementRequestComponent},

      {path:'reimbApproval',component:ReimbursementApprovalComponent},

      {path:'reimbList',component:ReimbursementListComponent},

      {path:'reimbReport',component:ReimbursementReportComponent},



     ],
     canActivate:[AuthGuard]

    },
    
    
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
