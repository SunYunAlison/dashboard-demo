import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {RouterModule} from '@angular/router';
import { NgxCaptureModule } from "ngx-capture";
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxCaptureModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class LayoutModule { }
