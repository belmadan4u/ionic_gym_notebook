import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';


const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'exercises',
        loadChildren: () => import('../exercise/exercise.module').then(m => m.ExercisePageModule)
      },
      {
        path: 'programs',
        loadChildren: () => import('../programs/programs.module').then(m => m.ProgramsPageModule)
      },
      {
        path: 'info',
        loadChildren: () => import('../info/info.module').then(m => m.InfoPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/programs',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/programs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
