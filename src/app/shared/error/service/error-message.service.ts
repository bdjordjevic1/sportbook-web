import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValidationError } from '../model/validation-error.model';

@Injectable({ providedIn: 'root' })
export class ErrorMessageService {
  constructor(private http: HttpClient) {}

  getValidationMessages(fieldName: string): Observable<ValidationError> {
    return this.http.get<ValidationError[]>('assets/errors.json').pipe(
      map((validationErrors: ValidationError[]) => {
        return validationErrors.find((validationError) => validationError.fieldName === fieldName);
      })
    );
  }
}
