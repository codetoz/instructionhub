import { TimePassed } from '../../helpers/date';

export function formatTimePassed(timePassed: TimePassed) {
  switch (true) {
    case timePassed.years > 0:
      return `${timePassed.years} year${timePassed.years > 1 ? 's' : ''} ago`;
    case timePassed.months > 0:
      return `${timePassed.months} month${timePassed.months > 1 ? 's' : ''} ago`;
    case timePassed.weeks > 0:
      return `${timePassed.weeks} week${timePassed.weeks > 1 ? 's' : ''} ago`;
    case timePassed.days > 0:
      return `${timePassed.days} day${timePassed.days > 1 ? 's' : ''} ago`;
    case timePassed.hours > 0:
      return `${timePassed.hours} hour${timePassed.hours > 1 ? 's' : ''} ago`;
    case timePassed.minutes > 0:
      return `${timePassed.minutes} minute${timePassed.minutes > 1 ? 's' : ''} ago`;
    default:
      return 'just now';
  }
}
