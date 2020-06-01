import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTeammatesComponent } from './add-teammates/add-teammates.component';
import { GroupAddComponent } from './group-add/group-add.component';

const routes: Routes = [
  { path: 'create/add-teammates', component: AddTeammatesComponent },
  { path: '', component: GroupAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupsRoutingModule {}
