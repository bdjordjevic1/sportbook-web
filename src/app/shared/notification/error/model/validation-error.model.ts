import { ErrorMessage } from './error-message.model';

export interface ValidationError {
  fieldName: string;
  errorMessages: ErrorMessage[];
}
