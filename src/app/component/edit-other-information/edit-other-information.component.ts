import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OtherInfoService } from 'src/app/appService/other-info.service';

@Component({
  selector: 'app-edit-other-information',
  templateUrl: './edit-other-information.component.html',
  styleUrls: ['./edit-other-information.component.css']
})
export class EditOtherInformationComponent implements OnInit {

  otherInfoEditForm:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private otherInfoService:OtherInfoService,private location:Location) { 
    this.otherInfoEditForm=fb.group({  //group the whole data into formLogicalName object
      id:[''],
      father:[''],
      dob:[''],
      phone:[''],
      email:[''],
      presentAddr:[''],
      permanentAddr:[''],
     
   })
  }

  ngOnInit() {
    let editotherInfoData=this.otherInfoService.editOtherInfoData;
    console.log("Edit Data:",editotherInfoData);
    

    //patch value into form
    this.otherInfoEditForm.patchValue({
      id: editotherInfoData[0].id,
      father:editotherInfoData[0].father,
      dob:editotherInfoData[0].dob,
      phone: editotherInfoData[0].phone,
      email:editotherInfoData[0].email,
      presentAddr:editotherInfoData[0].presentAddr,
      permanentAddr: editotherInfoData[0].permanentAddr,
    })
  }
  //Update editForm Data
  onOtherInfoEditForm(){
    console.log("Edit form Data:",this.otherInfoEditForm.value);


    let empOtherInfo=JSON.parse(localStorage.getItem('EmployeesOtherInfo'))
    console.log("sksk",empOtherInfo)

         for (var i = 0; i < empOtherInfo.length; ++i) {
            if (empOtherInfo[i].id === this.otherInfoEditForm.value.id) {
              empOtherInfo[i] = this.otherInfoEditForm.value;
              localStorage.setItem('EmployeesOtherInfo',JSON.stringify(empOtherInfo))
            }
          }
          console.log("emp Data:",empOtherInfo);
          this.location.back();
  }

}
