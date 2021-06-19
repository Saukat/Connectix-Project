import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReimbursementService } from 'src/app/appService/reimbursement.service';
import { EmployeeLoginService } from 'src/app/connectixService/Employee/employee-login.service';
import { EmployeeProfileService } from 'src/app/employeeService/employee-profile.service';


@Component({
  selector: 'app-reimbursement',
  templateUrl: './reimbursement.component.html',
  styleUrls: ['./reimbursement.component.css']
})
export class ReimbursementComponent implements OnInit {
  constructor(private _fb: FormBuilder,private _reimbursementService:ReimbursementService,
    private empProfileService:EmployeeProfileService,
    private _empLoginService:EmployeeLoginService,private router:Router) { }
  public ReimbursementForm: FormGroup;
id;
name;
higherAuthNames;
HigherAuthId
  ngOnInit() {

    this.id=this.empProfileService.id;
    this.name=this._empLoginService.empName;  
    console.log("Name",this.name);
    

    this._reimbursementService.getHigherAuthNameByEmpId(this.id).subscribe(
      response=>{
        console.log("Data of Res",response)
        this.HigherAuthId=response["repostHighAuthId"];
        this.higherAuthNames=response["reportHighAuth"]
        console.log("Highre Anme",this.higherAuthNames)
      },error=>(
       

        console.log("Error")
      )
    )



    // alert("Working on Reimbursement,Please Don't Use!!")
  	this.ReimbursementForm = this._fb.group({
      empId:[''],
      empName:[''],
  	  title:[''],
      subject:[''],
      billDate:[''],
      amount:[''],
      higherAuth:[''],
      highAuthName:[''],

  	  // descripition:[''],
      itemRows: this._fb.array([this.initItemRows()]),
      fileSource: new FormControl('', [Validators.required])
    });
  }

  get formArr() {
    return this.ReimbursementForm.get('itemRows') as FormArray;
  }

  initItemRows() {
    return this._fb.group({
      attachmentOfBill:[''],
    });
  }

  addNewRow() {
    this.formArr.push(this.initItemRows());
  }

  deleteRow(index: number) {
    this.formArr.removeAt(index);
  }

  selectFiles(event){
    console.log(event.target.files);
  }


  files:string  []  =  [];
  onFileChange(event) {

    for (var i = 0; i < event.target.files.length; i++) { 

      this.files.push(event.target.files[i]);
     
  }
    this.ReimbursementForm.patchValue({
        fileSource: this.files
      });
  
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   this.ReimbursementForm.patchValue({
    //     fileSource: file
    //   });
    // }
  }



 //submit button
 img;
 dec;
 onReimbursementSubmit(){


  console.log("Form===>",this.ReimbursementForm.value.fileSource);
  
 // this._reimbursementService.addFile(formData).subscribe(
    //   res => {
    //   console.log(res);
//  this.img=res['uploaded_file']
//  console.log("img",this.img);
// this.dec= atob(this.img);
//  console.log(atob(this.img));
 
    // },error=>{
    //   console.log("Error");
      
    // }
    // )

    this._reimbursementService.claimReimbursement(this.ReimbursementForm.value).subscribe(
      response=>{
        console.log("Send ",response);
       
        let id=response["id"];

        console.log("Id No 505",id);



//append into form data
        for(let i=0;i<=this.files.length;i++){

          formData.append('files', this.files[i]);
        }

     

         console.log("File",formData);


    this._reimbursementService.addFile(formData,id).subscribe(
       res => {        
       console.log(res);        
    },error=>{
       console.log("Error",error);
    })
        this.router.navigate(["empDashboard","reimList"]);
      },error=>{
        console.log("Error ");
      }
    )






  const formData = new FormData();
  for (var i = 0; i < this.files.length; i++) { 

    formData.append("file[]", this.files[i]);

  }

  console.log("Form Data:",formData);
  

  

}


   

  }










