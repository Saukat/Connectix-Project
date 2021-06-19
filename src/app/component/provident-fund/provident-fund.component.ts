import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProvidentFundService } from 'src/app/appService/provident-fund.service';
import { ProvidentFund } from 'src/app/models/providentFund';

@Component({
  selector: 'app-provident-fund',
  templateUrl: './provident-fund.component.html',
  styleUrls: ['./provident-fund.component.css']
})
export class ProvidentFundComponent implements OnInit {

  providentFund:FormGroup; //hold object of admin-login form
  constructor(private fb:FormBuilder,private route:ActivatedRoute,private providentService:ProvidentFundService) { 
    this.providentFund=fb.group({  //group the whole data into formLogicalName object
      id:[''],
      pfStatus:[''],
      pfUan:[''],
      professionalTax:[''],
      EsicIP:['']
   })
  }

  id
  ngOnInit() {
    this.id = this.route.snapshot.params['id'];  //getting from single-emp-details
    console.log("id otherInfo ====>",this.id)  
  }

  onProvidentFundForm(){
    console.log(this.providentFund.value);


    let id=this.providentFund.value.id;
    
    let pfStatus=this.providentFund.value.pfStatus;
    let pfUan=this.providentFund.value.pfUan;
    let professionalTax=this.providentFund.value.professionalTax;
    let EsicIP=this.providentFund.value.EsicIP;

    let providentfundData:ProvidentFund={
      id,
      pfStatus,
      pfUan,
      professionalTax,
      EsicIP,
     
}
  this.saveProvidentFund(providentfundData);
   return providentfundData;
    
  }
  saveProvidentFund(providentData){
    console.log("Provident Data",providentData);
    this.providentService.saveProvidentFund(providentData);  //send data to saveProvidentFund service class
  }



}
