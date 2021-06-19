export interface PayrollDetails{
    // id?:any,
    // title:string,
    // name:string,
    // email:string,
    // hireDate:any
    // jobTitle:string,
    // location:string
    // department:string
    // rollType:string
    // gender:string,
    // photo?:string
    id?:any,
    name:string,
    totalCostToCompany:number,
    grossPay:number,
    salaryMonth:number,
    addition:number,
    deduction:number,
    reimbursements:number,
    paidHoliday:string,
    unPaidHoliday:string,
    remark:string,
    status:string
}