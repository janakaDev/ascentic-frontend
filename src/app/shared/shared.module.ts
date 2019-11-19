import { NgModule } from '@angular/core';
import {MatCardModule, MatIconModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialModule} from '../material';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [FlexLayoutModule, CommonModule, FormsModule, ReactiveFormsModule, MaterialModule,
    MatCardModule, MatToolbarModule, FormsModule, MatSelectModule, MatIconModule, ChartsModule],
  declarations: [],
  providers: [FormsModule],
  exports: [FlexLayoutModule, CommonModule, FormsModule, ReactiveFormsModule, MaterialModule,
    MatCardModule, MatToolbarModule, FormsModule, MatSelectModule, MatIconModule, ChartsModule]
})
export class SharedModule { }
