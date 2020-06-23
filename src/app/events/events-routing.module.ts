import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../shared/authentication/auth-guard.service';
import { AddTeammatesComponent } from './add-teammates/add-teammates.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsTabComponent } from './events-tab/events-tab.component';

const routes: Routes = [
  // {
  //   path: '',
  //   component: EventsTabComponent,
  //   children: [
  //     { path: '', component: EventsListComponent },
  //     { path: 'create', component: EventAddComponent },
  //     { path: 'add-teammates', component: AddTeammatesComponent },
  //   ],
  //   canActivate: [AuthGuardService],
  // },
  { path: '', component: EventsListComponent },
  { path: 'create', component: EventAddComponent },
  { path: 'add-teammates', component: AddTeammatesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
