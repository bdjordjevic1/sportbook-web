import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedModule } from '../shared/shared.module';
import { AddTeammatesComponent } from './add-teammates/add-teammates.component';
import { GroupAddComponent } from './group-add/group-add.component';
import { GroupsRoutingModule } from './groups-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, ExploreContainerComponentModule, GroupsRoutingModule, SharedModule],
  declarations: [AddTeammatesComponent, GroupAddComponent],
})
export class GroupsModule {}
