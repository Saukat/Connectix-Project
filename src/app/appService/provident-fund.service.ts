import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProvidentFundService {
  editProvidentData;
  constructor(private location:Location) { }


  saveProvidentFund(providentfundData){
    let providentFund=[]
  if(localStorage.getItem('ProvidentFundDetails')){
     providentFund=JSON.parse(localStorage.getItem('ProvidentFundDetails'))
     providentFund=[providentfundData, ...providentFund];
  }else{
    providentFund=[providentfundData];
  }
  localStorage.setItem('ProvidentFundDetails',JSON.stringify(providentFund))
  //this.router.navigate(['dashboard','allEmp']);
  this.location.back();
}


  getOneEmpProvidentFund(id){
    let providentFund=JSON.parse(localStorage.getItem('ProvidentFundDetails'));
    console.log("All info",providentFund);
    console.log("Provident Fund Data=>",providentFund);
    
    

   
      if (providentFund==null) {
        console.log("No Data")
        return null;
      }if(providentFund[0].id !== id){
        console.log("Id not Matched")
           return null;
      }else{
        let oneRecords= providentFund.filter(data=>{
          return data.id===id
         })
          console.log("One",oneRecords)
   
          return oneRecords;
      }
  }
}
