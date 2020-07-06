import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeammatesComponent } from './add-teammates/add-teammates.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventsListComponent } from './events-list/events-list.component';

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
  { path: 'my-events', component: EventsListComponent },
  { path: 'create', component: EventAddComponent },
  { path: 'add-teammates', component: AddTeammatesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
