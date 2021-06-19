import { Location } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';

import { ConAdminLoginService } from '../connectixService/Admin/con-admin-login.service';
import { PaymentInfo } from '../models/payment-info';
import { environment } from 'src/environments/environment.prod';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  // getAllPaymentUrl="http://192.168.1.25:5858/connectix/payment/all";
  getAllPaymentUrl=environment.api_url+"/payment/all";

  // savePaymentUrl="http://192.168.1.25:5858/connectix/payment/save";
  savePaymentUrl=environment.api_url+"/payment/save";

  // updatePaymentUrl="http://192.168.1.25:5858/connectix/payment/update";
  updatePaymentUrl=environment.api_url+"/payment/update";


 editPaymentInfoData;
  constructor(private location:Location,private http:HttpClient,private _adminService:ConAdminLoginService) { }



  //save salary structure data into db
  savePayment(payment:PaymentInfo){
    let token=this._adminService.getToken();
   
    const httpOptionsPlain = {
      headers: new HttpHeaders({
        'Authorization': token
      }),
      responseType: 'text' as 'json'
    };
     return this.http.post(this.savePaymentUrl,payment,httpOptionsPlain);
  }

//getAll data

getAllPayment(){
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    })
  };
  return this.http.get(this.getAllPaymentUrl,httpOptionsPlain)
}




//update payment data
updatePayment(payment){
  let token=this._adminService.getToken();
   
  const httpOptionsPlain = {
    headers: new HttpHeaders({
      'Authorization': token
    }),
    responseType: 'text' as 'json'
  };
  return this.http.put(this.updatePaymentUrl,payment,httpOptionsPlain);
 }








//Save Payment Data
  savePaymentInfo(PaymentInfoData){
    let paymentInfo=[]
  if(localStorage.getItem('PaymentInfoDetails')){
     paymentInfo=JSON.parse(localStorage.getItem('PaymentInfoDetails'))
     paymentInfo=[PaymentInfoData, ...paymentInfo];
  }else{
    paymentInfo=[PaymentInfoData];
  }
  localStorage.setItem('PaymentInfoDetails',JSON.stringify(paymentInfo))
  //this.router.navigate(['dashboard','allEmp']);
  this.location.back();
}


  //get Records from local storage
  getOneEmpPaymentInfo(id){
    let allPaymentInfo=JSON.parse(localStorage.getItem('PaymentInfoDetails'));
    console.log("All info",allPaymentInfo);
    console.log("Provident Fund Data=>",allPaymentInfo);
    
    
      if (allPaymentInfo==null) {
        console.log(" Payment No Data")
        return null;
      }if(allPaymentInfo[0].id !== id){
        console.log(" Payment Id not Matched")
           return null;
      }else{
        let oneRecords= allPaymentInfo.filter(data=>{
          return data.id===id
         })
          console.log("One Payment",oneRecords)
   
          return oneRecords;
      }
  }
}
