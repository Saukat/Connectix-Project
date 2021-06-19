import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ReimbursementService } from 'src/app/appService/reimbursement.service';

@Component({
  selector: 'app-reimbursement-approval',
  templateUrl: './reimbursement-approval.component.html',
  styleUrls: ['./reimbursement-approval.component.css']
})
export class ReimbursementApprovalComponent implements OnInit {

 
  empReimRemarkForm:FormGroup
  constructor(private reimService:ReimbursementService,private dialog:MatDialog,
    private fb:FormBuilder,private router:Router) { 
      this.empReimRemarkForm=fb.group({
          id:[''],
          status:['',Validators.required],
          higherAuthremark:['',Validators.required]
      })
    }
getOneReimData;
reimId
  ngOnInit() {
    this.getOneReimData=this.reimService.getReimSingleData;
     console.log(this.getOneReimData);
     
    this.reimId=this.getOneReimData.id;
  }

  openDialog(template: TemplateRef<any>){
    this.dialog.open(template);
}

onReimRemark(){
  console.log(this.empReimRemarkForm.value);
  
  this.reimService.reimUpdate(this.empReimRemarkForm.value).subscribe(
    response=>{
      console.log("updated",response);
      this.router.navigate(["dashboard","reimbRequest"]);
      this.dialog.closeAll();
    },error=>{
      console.log("Error");
    }
  )
}

download(url){
  console.log("url",url);
  window.open(url, '_blank');
}

}
