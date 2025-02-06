export function diffMonths(dt2: Date, dt1: Date) {
  const seconds = (dt2.getTime() - dt1.getTime()) / 1000;
  const diff = seconds / (60 * 60 * 24 * 7 * 4);
  return Math.abs(Math.round(diff));
}
