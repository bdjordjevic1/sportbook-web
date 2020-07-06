import { Injectable } from '@angular/core';
import { VALIDATION_ERRORS } from '../../../constants/constants';
import { ValidationError } from '../model/validation-error.model';

@Injectable({ providedIn: 'root' })
export class ErrorMessageService {
  constructor() {}

  getValidationMessages(fieldName: string): ValidationError {
    return VALIDATION_ERRORS.find((error: ValidationError) => {
      return error.fieldName === fieldName;
    });
  }
}
