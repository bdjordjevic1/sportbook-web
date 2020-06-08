import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiEndpointPipe } from './pipe/apiEndpoint.pipe';

@NgModule({
  imports: [HttpClientModule, ReactiveFormsModule],
  declarations: [ApiEndpointPipe],
  exports: [HttpClientModule, ReactiveFormsModule, ApiEndpointPipe],
})
export class SharedModule {}
