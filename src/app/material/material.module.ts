import { NgModule } from '@angular/core';

import {MatBadgeModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatListModule, MatMenuModule, MatOption, MatPaginatorModule, MatSelectModule, MatSidenavModule, MatSortModule, MatToolbarModule} from '@angular/material';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';

import {MatDialogModule} from '@angular/material/dialog';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatProgressSpinnerModule} from '@angular/material'
// import { MatFormFieldModule } from '@angular/material/form-field';

const MaterialComponents =[
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSortModule,
  MatIconModule,
  MatDatepickerModule,
  MatDialogModule,
  MatBadgeModule,
  MatMomentDateModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    // MaterialModule,
    MatSelectModule,
]

@NgModule({
  declarations: [],
  imports: [MaterialComponents],
  exports: [MaterialComponents]

})
export class MaterialModule { }
