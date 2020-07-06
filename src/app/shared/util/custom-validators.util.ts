import { AbstractControl } from '@angular/forms';

export default class CustomValidators {
  static matchingPasswords(control: AbstractControl) {
    if (control.parent !== undefined && control.value !== control.parent.get('password').value) {
      return { matchingPasswords: true };
    }
    return;
  }
}
