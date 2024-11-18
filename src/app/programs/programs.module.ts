import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramsPage } from './programs.page';

import { ProgramsPageRoutingModule } from './programs-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ProgramsPageRoutingModule
  ],
  declarations: [ProgramsPage]
})
export class ProgramsPageModule {}
