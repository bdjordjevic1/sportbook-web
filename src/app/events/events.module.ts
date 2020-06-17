import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { SharedModule } from '../shared/shared.module';
import { AddTeammatesComponent } from './add-teammates/add-teammates.component';
import { EventAddComponent } from './event-add/event-add.component';
import { EventsListComponent } from './events-list/events-list.component';
import { EventsRoutingModule } from './events-routing.module';

@NgModule({
  imports: [IonicModule, CommonModule, ExploreContainerComponentModule, EventsRoutingModule, SharedModule],
  declarations: [AddTeammatesComponent, EventAddComponent, EventsListComponent],
})
export class EventsModule {}
