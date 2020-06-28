import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SbErrorComponent } from './notification/error/sb-error/sb-error.component';
import { NotificationContainerComponent } from './notification/notification-container/notification-container.component';
import { ApiEndpointPipe } from './pipe/apiEndpoint.pipe';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [HttpClientModule, ReactiveFormsModule, IonicModule, CommonModule, RouterModule],
  declarations: [ApiEndpointPipe, SbErrorComponent, NotificationContainerComponent, TabsComponent],
  exports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ApiEndpointPipe,
    SbErrorComponent,
    NotificationContainerComponent,
    TabsComponent,
  ],
})
export class SharedModule {}
