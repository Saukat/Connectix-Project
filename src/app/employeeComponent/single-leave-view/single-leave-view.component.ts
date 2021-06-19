import { Component, OnInit } from '@angular/core';
import { LeaveAttendanceService } from 'src/app/appService/leave-attendance.service';

@Component({
  selector: 'app-single-leave-view',
  templateUrl: './single-leave-view.component.html',
  styleUrls: ['./single-leave-view.component.css']
})
export class SingleLeaveViewComponent implements OnInit {

  constructor(private leaveService:LeaveAttendanceService) { }
  leaveData;
  ngOnInit() {
    this.leaveData=this.leaveService.singleLeaveView;
    console.log("Data",this.leaveData);
    
  }

}
