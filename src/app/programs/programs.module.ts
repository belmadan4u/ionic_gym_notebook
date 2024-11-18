import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProgramsPage } from './programs.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { ProgramsPageRoutingModule } from './programs-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    ProgramsPageRoutingModule
  ],
  declarations: [ProgramsPage]
})
export class ProgramsPageModule {}
