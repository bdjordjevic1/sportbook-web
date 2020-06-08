import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({ name: 'apiEndpoint' })
export class ApiEndpointPipe implements PipeTransform {
  transform(value: any) {
    return environment.sportbookApiEndpoint + value;
  }
}
