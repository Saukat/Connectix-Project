import { Location } from '@angular/common';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OtherInfoService implements OnInit{
  editOtherInfoData;
  constructor(private location:Location) { }

  ngOnInit(){
    console.log("data of edit=>",this.editOtherInfoData);
    
  }


  saveEmployeeOtherlInfo(empOtherlInfo){
      let employeeOtherInfo=[]
    if(localStorage.getItem('EmployeesOtherInfo')){
       employeeOtherInfo=JSON.parse(localStorage.getItem('EmployeesOtherInfo'))
       employeeOtherInfo=[empOtherlInfo, ...employeeOtherInfo];
    }else{
      employeeOtherInfo=[empOtherlInfo];
    }
    localStorage.setItem('EmployeesOtherInfo',JSON.stringify(employeeOtherInfo))
    //this.router.navigate(['dashboard','allEmp']);
    this.location.back();
  }

  getAllEmpOtherInfo(id){
    // debugger;
    let employeeAllOtherInfo=JSON.parse(localStorage.getItem('EmployeesOtherInfo'));
    
  //  let t= employeeAllOtherInfo.find((ele,ind,arr)=>{
  //      console.log(ele);
  //      return arr[ind].id===id
  //   })
  //   console.log("Fahahah=",t)
    



    
    // for(let i=0;i<=employeeAllOtherInfo.length;i++){
        if (employeeAllOtherInfo==null) {
          console.log("No Data")
          return null;
        }
        else{
          let oneRecords= employeeAllOtherInfo.filter(data=>{
            return data.id===id
          })
            console.log("One",oneRecords)
    
            return oneRecords;
        }
    // }
    
   
      
  }

}
