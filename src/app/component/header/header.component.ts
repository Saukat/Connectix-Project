import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConAdminLoginService } from 'src/app/connectixService/Admin/con-admin-login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  show=true
  constructor(private _adminService:ConAdminLoginService,private router:Router) { }

  ngOnInit() {
  }

  LogoutAdmin(){
   alert("Logout Sucessfully!!")
    this._adminService.logout();
  }
  resetPasword(){
      //  this.router.navigate(['dashboard/resetPassword'])
       this.router.navigate(['dashboard','resetPassword']);
  }

  ApprovalLeaveAdmin(){
    
  }
  showHide(t){
    t.target.value="true";
    if(true===this.show){
      this.show=false
      console.log("flase",this.show)
      // t.target.previousSibling.setAttribute('class','animation');
      // setTimeout(()=>{
      //    t.target.previousSibling.removeAttribute('class')
      // },2000)
      
    }else{
      this.show=true
    }
    console.log("daa",t.target.value);
    
  }

}
