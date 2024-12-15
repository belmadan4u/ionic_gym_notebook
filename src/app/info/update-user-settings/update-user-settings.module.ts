import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateUserSettingsPageRoutingModule } from './update-user-settings-routing.module';

import { UpdateUserSettingsPage } from './update-user-settings.page';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateUserSettingsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdateUserSettingsPage]
})
export class UpdateUserSettingsPageModule {}
