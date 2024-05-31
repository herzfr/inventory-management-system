import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';

    const date = typeof value === 'string' ? new Date(value) : value;
    if (isNaN(date.getTime())) return value.toString(); // Return input value if not a valid date

    // Get month name
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];

    // Get day with suffix
    const day = date.getDate();
    let dayWithSuffix;
    switch (day % 10) {
      case 1:
        dayWithSuffix = day + 'st';
        break;
      case 2:
        dayWithSuffix = day + 'nd';
        break;
      case 3:
        dayWithSuffix = day + 'rd';
        break;
      default:
        dayWithSuffix = day + 'th';
    }

    // Get year, hour, and minute
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();

    // Format the date string
    return `${month}, ${dayWithSuffix} ${year} ${hour}:${minute.toString().padStart(2, '0')}`;
  }

}
