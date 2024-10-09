export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday';

export const DAYS_OF_WEEK: ReadonlyArray<DayOfWeek> = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
];

export const WORKING_DAYS_OF_WEEK: ReadonlyArray<DayOfWeek> = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday'
];

export const NUMBER_OF_DAYS = DAYS_OF_WEEK.length;
export const NUMBER_OF_WORKING_DAYS = WORKING_DAYS_OF_WEEK.length;
