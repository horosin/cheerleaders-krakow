export function formatDateShort(dateString: string) {
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString
  return new Intl.DateTimeFormat("pl-PL", {
    day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
  }).format(date)
}

function longDateFormatter(locale: string) {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric", month: "long", year: "numeric", timeZone: "UTC",
  })
}

export function formatDateLong(dateString: string, locale: string) {
  const date = new Date(dateString)
  return Number.isNaN(date.getTime()) ? dateString : longDateFormatter(locale).format(date)
}

export function formatDateRange(start: string, end: string, locale: string) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime()) || startDate > endDate) {
    return [start, end].filter(Boolean).join(" – ")
  }
  return longDateFormatter(locale).formatRange(startDate, endDate)
}
