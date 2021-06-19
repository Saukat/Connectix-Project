import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProvidentFundService } from 'src/app/appService/provident-fund.service';

@Component({
  selector: 'app-edit-provident-fund',
  templateUrl: './edit-provident-fund.component.html',
  styleUrls: ['./edit-provident-fund.component.css']
})
export class EditProvidentFundComponent implements OnInit {

  editProvidentFund:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private providentService:ProvidentFundService,private location:Location) { 
    this.editProvidentFund=fb.group({  //group the whole data into formLogicalName object
      id:[''],
      pfStatus:[''],
      pfUan:[''],
      professionalTax:[''],
      EsicIP:['']
   })
  }

  ngOnInit() {

    let editProvidentData=this.providentService.editProvidentData;
    console.log("Edit Data:",editProvidentData);
    
    
    //patch value into form
    this.editProvidentFund.patchValue({
      id: editProvidentData[0].id,
      pfStatus:editProvidentData[0].pfStatus,
      pfUan:editProvidentData[0].pfUan,
      professionalTax: editProvidentData[0].professionalTax,
      EsicIP:editProvidentData[0].EsicIP,
     
   })
  }
  onEditProvidentFundForm(){
    console.log(this.editProvidentFund.value)



    let allProvidentFund=JSON.parse(localStorage.getItem('ProvidentFundDetails'))
    console.log("sksk",allProvidentFund)

         for (var i = 0; i < allProvidentFund.length; ++i) {
            if (allProvidentFund[i].id === this.editProvidentFund.value.id) {
              allProvidentFund[i] = this.editProvidentFund.value;
              localStorage.setItem('ProvidentFundDetails',JSON.stringify(allProvidentFund))
            }
          }
          console.log("emp provident fund Data:",allProvidentFund);
          this.location.back();
  }

}
