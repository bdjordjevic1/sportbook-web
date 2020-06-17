import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/authentication/auth-guard.service';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'groups',
        loadChildren: () => import('../events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'tab2',
        loadChildren: () => import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () => import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: '',
        redirectTo: '/groups',
        pathMatch: 'full',
      },
    ],
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    redirectTo: '/tabs/groups',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
