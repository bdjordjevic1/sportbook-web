import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeammatesComponent } from './add-teammates/add-teammates.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventsListComponent } from './events-list/events-list.component';

const routes: Routes = [
  { path: 'create/add-teammates', component: AddTeammatesComponent },
  { path: '', component: EventAddComponent },
  // { path: '', component: EventsListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventsRoutingModule {}
