import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddProgramPageRoutingModule } from './add-program-routing.module';

import { AddProgramPage } from './add-program.page';
import { ReactiveFormsModule } from '@angular/forms'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddProgramPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddProgramPage]
})
export class AddProgramPageModule {}
