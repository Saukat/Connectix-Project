import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ReimbursementService } from 'src/app/appService/reimbursement.service';

@Component({
  selector: 'app-edit-reim',
  templateUrl: './edit-reim.component.html',
  styleUrls: ['./edit-reim.component.css']
})
export class EditReimComponent implements OnInit {
  editReimbursementForm:FormGroup
  constructor(private fb:FormBuilder,private reimService:ReimbursementService,
    private router:Router) { 
    this.editReimbursementForm = this.fb.group({
      id:[''],
      empId:[''],
      empName:[''],
  	  title:[''],
      subject:[''],
      billDate:[''],
      amount:[''],
      higherAuth:[''],
      highAuthName:[''],
      status:['']
  	  // descripition:[''],
      // itemRows: this._fb.array([this.initItemRows()])
    });
  }
allReim;
  ngOnInit() {

    this.allReim=this.reimService.getReimAllData;
    console.log("allll",this.allReim);
    

    this.editReimbursementForm.patchValue({
      id:this.allReim.id,
      empId:this.allReim.empId,
      empName:this.allReim.empName,
      title:this.allReim.title,
      subject:this.allReim.subject,
      billDate:this.allReim.billDate,

      
      amount:this.allReim.amount,
      higherAuth:this.allReim.higherAuth,
      highAuthName:this.allReim.highAuthName,
      status:this.allReim.status,
  })
 
  }

  onEditReimbursementSubmit(){
    this.reimService.updateReimbursement(this.editReimbursementForm.value).subscribe(
      response=>{
        this.router.navigate(["empDashboard","reimList"]);
      },error=>{
           console.log("error")
      }
    )
  }

}
