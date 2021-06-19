import { Component, OnInit } from '@angular/core';
import { AdminLoginService } from './appService/admin-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Connectix-Payroll';
 
  constructor(private alService:AdminLoginService){

  }
  
  ngOnInit(){
   // console.log("data:;;;;;;;;;;;", this.alService.booleanValue);
  }
 
}
