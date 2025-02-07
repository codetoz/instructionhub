export function diffMonths(dt2: Date, dt1: Date) {
  const seconds = (dt2.getTime() - dt1.getTime()) / 1000;
  const diff = seconds / (60 * 60 * 24 * 7 * 4);
  return Math.abs(Math.round(diff));
}

/**
 * Represents the time difference in various units.
 */
export interface TimePassed {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
}
/**
 * Calculates how much time has passed from the given date until now.
 * The result includes years, months (calculated based on year/month differences),
 * weeks, days, hours, and minutes.
 *
 * @param fromDate - The past date to calculate the difference from.
 * @returns An object containing the time passed in different units.
 */
export function calculateTimePassed(fromDate: Date): TimePassed {
  const now = new Date();

  // Calculate years difference.
  let years = now.getFullYear() - fromDate.getFullYear();
  // Adjust if the current date hasn't reached the anniversary of fromDate.
  if (
    now.getMonth() < fromDate.getMonth() ||
    (now.getMonth() === fromDate.getMonth() &&
      now.getDate() < fromDate.getDate())
  ) {
    years--;
  }

  // Calculate months difference.
  let months =
    (now.getFullYear() - fromDate.getFullYear()) * 12 +
    (now.getMonth() - fromDate.getMonth());
  // Adjust if the current day is less than the day in fromDate.
  if (now.getDate() < fromDate.getDate()) {
    months--;
  }

  // Calculate the difference in milliseconds.
  const msDiff = now.getTime() - fromDate.getTime();

  // Calculate minutes, hours, days, and weeks.
  const minutes = Math.floor(msDiff / (1000 * 60));
  const hours = Math.floor(msDiff / (1000 * 60 * 60));
  const days = Math.floor(msDiff / (1000 * 60 * 60 * 24));
  const weeks = Math.floor(days / 7);

  return {
    years,
    months,
    weeks,
    days,
    hours,
    minutes,
  };
}
