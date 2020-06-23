import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './shared/authentication/auth-guard.service';

const routes: Routes = [
  {
    path: 'events',
    loadChildren: () => import('./events/events.module').then((m) => m.EventsModule),
    canActivate: [AuthGuardService],
  },
  {
    path: '',
    loadChildren: () => import('./users/users.module').then((m) => m.UsersModule),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
