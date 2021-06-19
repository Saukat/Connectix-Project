import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OtherInfoService } from 'src/app/appService/other-info.service';
import { OtherInfo } from 'src/app/models/employee-other-info';

@Component({
  selector: 'app-other-information',
  templateUrl: './other-information.component.html',
  styleUrls: ['./other-information.component.css']
})
export class OtherInformationComponent implements OnInit {

  otherInfoForm:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private otherInfoService:OtherInfoService,private route:ActivatedRoute) { 
    this.otherInfoForm=fb.group({  //group the whole data into formLogicalName object
      id:[''],
      father:[''],
      dob:[''],
      phone:[''],
      email:[''],
      presentAddr:[''],
      permanentAddr:[''],
     
   })
  }
  id;
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  //getting from single-emp-details
     console.log("id otherInfo ====>",this.id)  
  }

  onOtherInfoForm(){
 
    let id=this.otherInfoForm.value.id;
    
    let father=this.otherInfoForm.value.father;
    let dob=this.otherInfoForm.value.dob;
    

    let phone=this.otherInfoForm.value.phone;
    let email=this.otherInfoForm.value.email;
    let presentAddr=this.otherInfoForm.value.presentAddr;
    let permanentAddr=this.otherInfoForm.value.permanentAddr;

    let otherInfo:OtherInfo={
      id,
      father,
      dob,
      phone,
      email,
      presentAddr,
      permanentAddr,
}
  this.saveEmployeeInfo(otherInfo);
   return otherInfo;
  }

  //send data to service file
  saveEmployeeInfo(personalInfo){
  console.log("employee Form other info",personalInfo);
  this.otherInfoService.saveEmployeeOtherlInfo(personalInfo);
}

}
