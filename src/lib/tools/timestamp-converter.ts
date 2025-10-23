export interface TimestampConversion {
  gmt: string;
  local: string;
  relative: string;
}

export function convertTimestamp(timestamp: string): TimestampConversion | null {
  if (!timestamp || timestamp.trim() === "") {
    return null;
  }

  try {
    let ts = parseInt(timestamp.trim());

    // Auto-detect if timestamp is in seconds or milliseconds
    // If less than year 2100 in seconds (4102444800), it's likely in seconds
    if (ts < 10000000000) {
      ts = ts * 1000; // Convert to milliseconds
    }

    const date = new Date(ts);

    // Check if valid date
    if (isNaN(date.getTime())) {
      return null;
    }

    // Format GMT time
    const gmtOptions: Intl.DateTimeFormatOptions = {
      timeZone: "UTC",
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    const gmtFormatted = new Intl.DateTimeFormat("en-GB", gmtOptions).format(date);
    const gmtMillis = date.getUTCMilliseconds().toString().padStart(3, "0");
    const gmt = `${gmtFormatted}.${gmtMillis}`;

    // Format local time with timezone
    const localOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZoneName: "short",
    };
    const localFormatted = new Intl.DateTimeFormat("en-GB", localOptions).format(
      date,
    );
    const localMillis = date.getMilliseconds().toString().padStart(3, "0");
    const local = `${localFormatted.replace(/ GMT/, ".").replace(/,/, "")}.${localMillis} GMT${getTimezoneOffset(date)}`;

    // Calculate relative time
    const relative = getRelativeTime(date);

    return { gmt, local, relative };
  } catch (error) {
    return null;
  }
}

function getTimezoneOffset(date: Date): string {
  const offset = -date.getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const hours = Math.floor(Math.abs(offset) / 60)
    .toString()
    .padStart(2, "0");
  const minutes = (Math.abs(offset) % 60).toString().padStart(2, "0");
  return `${sign}${hours}:${minutes}`;
}

function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffSec = Math.abs(diffMs / 1000);
  const isPast = diffMs < 0;

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = day * 365;

  let value: number;
  let unit: string;

  if (diffSec < minute) {
    value = Math.floor(diffSec);
    unit = value === 1 ? "second" : "seconds";
  } else if (diffSec < hour) {
    value = Math.floor(diffSec / minute);
    unit = value === 1 ? "minute" : "minutes";
  } else if (diffSec < day) {
    value = Math.floor(diffSec / hour);
    unit = value === 1 ? "hour" : "hours";
  } else if (diffSec < week) {
    value = Math.floor(diffSec / day);
    unit = value === 1 ? "day" : "days";
  } else if (diffSec < month) {
    value = Math.floor(diffSec / week);
    unit = value === 1 ? "week" : "weeks";
  } else if (diffSec < year) {
    value = Math.floor(diffSec / month);
    unit = value === 1 ? "month" : "months";
  } else {
    value = Math.floor(diffSec / year);
    unit = value === 1 ? "year" : "years";
  }

  return isPast ? `${value} ${unit} ago` : `In ${value} ${unit}`;
}
