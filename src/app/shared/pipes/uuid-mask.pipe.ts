import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uuidMask'
})
export class UuidMaskPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const parts = value.split('-');
    if (parts.length !== 5) return value;

    const firstPart = parts[0];
    const lastPart = parts[parts.length - 1];

    return `${firstPart}-****`;
  }
}
