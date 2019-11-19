import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { ClothslitsComponent } from './clothslits/clothslits.component';
import { ClothsaddeditComponent } from './clothsaddedit/clothsaddedit.component';
import {SharedModule} from '../shared/shared.module';

const routes: Routes = [
  {
    path: '',
    component: ClothslitsComponent
  },
  {
    path: 'add',
    component: ClothsaddeditComponent
  },
  {
    path: 'edit/:id',
    component: ClothsaddeditComponent
  }
];
@NgModule({
  declarations: [ClothslitsComponent, ClothsaddeditComponent],
  imports: [
    SharedModule, CommonModule, RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ClothesModule { }
