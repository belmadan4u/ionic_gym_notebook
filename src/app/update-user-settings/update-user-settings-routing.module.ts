import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateUserSettingsPage } from './update-user-settings.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateUserSettingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateUserSettingsPageRoutingModule {}
