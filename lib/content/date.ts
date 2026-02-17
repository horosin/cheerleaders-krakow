const monthShort = [
  "Sty",
  "Lut",
  "Mar",
  "Kwi",
  "Maj",
  "Cze",
  "Lip",
  "Sie",
  "Wrz",
  "Paź",
  "Lis",
  "Gru",
]

function getUtcDateParts(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return null
  }
  return {
    day: date.getUTCDate(),
    month: date.getUTCMonth(),
    year: date.getUTCFullYear(),
  }
}

export function formatDateShort(dateString: string) {
  const parts = getUtcDateParts(dateString)
  if (!parts) {
    return dateString
  }
  return `${parts.day} ${monthShort[parts.month]} ${parts.year}`
}

export function formatDateLong(dateString: string, locale: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) {
    return dateString
  }
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date)
}

export function formatDateRange(
  start: string,
  end: string,
  locale: string
) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return `${start} - ${end}`
  }

  const sameDay =
    startDate.getUTCFullYear() === endDate.getUTCFullYear() &&
    startDate.getUTCMonth() === endDate.getUTCMonth() &&
    startDate.getUTCDate() === endDate.getUTCDate()

  if (sameDay) {
    return formatDateLong(start, locale)
  }

  const sameMonth =
    startDate.getUTCFullYear() === endDate.getUTCFullYear() &&
    startDate.getUTCMonth() === endDate.getUTCMonth()

  if (sameMonth) {
    const monthName = new Intl.DateTimeFormat(locale, {
      month: "long",
    }).format(startDate)
    const year = startDate.getUTCFullYear()
    const startDay = startDate.getUTCDate()
    const endDay = endDate.getUTCDate()

    if (locale.startsWith("en")) {
      return `${monthName} ${startDay}-${endDay}, ${year}`
    }

    return `${startDay}-${endDay} ${monthName} ${year}`
  }

  return `${formatDateLong(start, locale)} - ${formatDateLong(end, locale)}`
}
