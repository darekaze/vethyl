import dayjs from 'dayjs'
import { DateUtils } from 'react-day-picker'

export const parseDate = (
  str: string,
  format: string,
  locale: string
): void | Date => {
  const parsed = dayjs(str, format, locale).toDate()

  if (DateUtils.isDate(parsed)) {
    return parsed
  }
  return undefined
}

export const formatDate = (date: Date, form: string, _: string): string => {
  return dayjs(date)
    .format(form)
    .toString()
}
