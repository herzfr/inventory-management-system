// error-validator.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'errorValidator'
})
export class ErrorValidatorPipe implements PipeTransform {
  transform(errors: ValidationErrors | null): string[] {
    const errorMessages: string[] = [];
    
    if (errors) {
      for (const key of Object.keys(errors)) {
        switch (key) {
          case 'required':
            errorMessages.push('This field is required.');
            break;
          case 'minlength':
            errorMessages.push(`Minimum length is ${errors[key].requiredLength}.`);
            break;
          case 'maxlength':
            errorMessages.push(`Maximum length is ${errors[key].requiredLength}.`);
            break;
          // Add more cases for other validation rules as needed
          default:
            errorMessages.push(`Validation error: ${key}`);
            break;
        }
      }
    }

    return errorMessages;
  }
}
