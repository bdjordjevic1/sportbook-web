import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidationMessage } from '../model/validation-message.model';

@Injectable({ providedIn: 'root' })
export class ErrorMessageService {
  constructor(private http: HttpClient) {}

  getValidationMessages(fieldName: string): Observable<ValidationMessage[]> {
    return this.http.get('assets/errors.json').pipe(
      map((errors) => {
        return errors[fieldName];
      })
    );
  }
}
