import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SbErrorComponent } from './error/sb-error/sb-error.component';
import { ApiEndpointPipe } from './pipe/apiEndpoint.pipe';

@NgModule({
  imports: [HttpClientModule, ReactiveFormsModule, IonicModule, CommonModule],
  declarations: [ApiEndpointPipe, SbErrorComponent],
  exports: [HttpClientModule, ReactiveFormsModule, FormsModule, ApiEndpointPipe, SbErrorComponent],
})
export class SharedModule {}
