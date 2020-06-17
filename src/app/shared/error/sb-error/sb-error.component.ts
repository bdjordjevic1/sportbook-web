import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { ValidationMessage } from '../model/validation-message.model';
import { ErrorMessageService } from '../service/error-message.service';

@Component({
  selector: 'app-sb-error',
  templateUrl: './sb-error.component.html',
  styleUrls: ['./sb-error.component.scss'],
})
export class SbErrorComponent implements OnInit {
  @Input() fieldName: string;
  @Input() field: AbstractControl;
  validationMessages$: Observable<ValidationMessage[]>;

  constructor(private errorMessageService: ErrorMessageService) {}

  ngOnInit() {
    this.validationMessages$ = this.errorMessageService.getValidationMessages(this.fieldName);
  }
}
