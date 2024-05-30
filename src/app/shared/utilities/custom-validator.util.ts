import { FormControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {
  static usernameValidator(control: FormControl): ValidationErrors | null {
    if (!control.value || control.value.trim() === '') {
      return { required: true };
    }
    return null;
  }

  static passwordValidator(control: FormControl): ValidationErrors | null {
    if (!control.value || control.value.trim() === '') {
      return { required: true };
    }
    return null;
  }
  

}
