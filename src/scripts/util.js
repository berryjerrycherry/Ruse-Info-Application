
// Determine Week A/B (Help from Joshua Koh)
let jan1 = new Date();
jan1.setMonth(0);
jan1.setDate(1);
jan1.setHours(0,0,0,0);

// Function to determine whether the day is in week A or week B
export function week(day) {
  return (Math.floor((daysFrom(jan1, day) - getFirstMonday()) / 7) % 2) ? 'A' : 'B';
}

//===============================================

/**
 * Gets first monday of the year
 */
export function getFirstMonday() {
  let date = new Date()
  date.setMonth(0)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)

  while (date.getDay() !== 1) {
    date.setDate(date.getDate() + 1)
  }

  return date.getDate()
}

/**
 * Gets the amount of days between 2 days
 */
export function daysFrom(date1, date2) {
  return (date1.getTime() - date2.getTime()) / (1000 * 3600 * 24)
}

/**
 * Returns elapsed time since the start of a date in milliseconds
 */
export function getDatesTime(date) {
  return (date.getHours() * 60 * 60 * 1000) + (date.getMinutes() * 60 * 1000) + (date.getMilliseconds())
}