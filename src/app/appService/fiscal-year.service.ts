import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiscalYearService {
  editFiscalYearData;
  constructor(private location:Location) { }

//Save Payment Data
  saveFiscalYear(fiscalYaear){
    let fiscalyearInfoall=[]
  if(localStorage.getItem('FiscalYearDetails')){
     fiscalyearInfoall=JSON.parse(localStorage.getItem('FiscalYearDetails'))
     fiscalyearInfoall=[fiscalYaear, ...fiscalyearInfoall];
  }else{
    fiscalyearInfoall=[fiscalYaear];
  }
  localStorage.setItem('FiscalYearDetails',JSON.stringify(fiscalyearInfoall))
  //this.router.navigate(['dashboard','allEmp']);
  this.location.back();
}

   //get Records from local storage
   getOneFiscalYear(id){
    let allFiscalYear=JSON.parse(localStorage.getItem('FiscalYearDetails'));
    console.log("All Fiscal Year info",allFiscalYear);
    console.log("Fiscal yaer Data=>",allFiscalYear);
    
    
      if (allFiscalYear==null) {
        console.log(" Fiscal No Data")
        return null;
      }if(allFiscalYear[0].id !== id){
        console.log(" Fiscal Id not Matched")
           return null;
      }else{
        let oneRecords= allFiscalYear.filter(data=>{
          return data.id===id
         })
          console.log("One Fiscal",oneRecords)
   
          return oneRecords;
      }
  }
}
