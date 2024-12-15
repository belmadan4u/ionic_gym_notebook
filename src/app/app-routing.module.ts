import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'add-program',
    loadChildren: () => import('./programs/add-program/add-program.module').then( m => m.AddProgramPageModule)
  },
  {
    path: 'update-user-settings',
    loadChildren: () => import('./info/update-user-settings/update-user-settings.module').then( m => m.UpdateUserSettingsPageModule)
  }, 
  {
    path: 'update-program/:id',
    loadChildren: () => import('./programs/update-program/update-program.module').then( m => m.UpdateProgramPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
