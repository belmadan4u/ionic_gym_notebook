import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';
import { UpdateProgramPageRoutingModule } from './update-program-routing.module';

import { UpdateProgramPage } from './update-program.page';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    UpdateProgramPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateProgramPage]
})
export class UpdateProgramPageModule {}
