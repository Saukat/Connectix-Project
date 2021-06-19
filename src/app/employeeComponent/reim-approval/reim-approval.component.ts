import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ReimbursementService } from 'src/app/appService/reimbursement.service';

@Component({
  selector: 'app-reim-approval',
  templateUrl: './reim-approval.component.html',
  styleUrls: ['./reim-approval.component.css']
})
export class ReimApprovalComponent implements OnInit {

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
      this.router.navigate(["empDashboard","reimRequest"]);
      this.dialog.closeAll();
    },error=>{
      console.log("Error");
    }
  )
}

}
