import React, { useState, useRef, ReactNode } from 'react'
import dayjs from 'dayjs'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DayPickerInputProps, DayPickerProps } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import { formatDate, parseDate } from 'utils/date'
import './style.css'

interface DateRangePickerProps {
  children?: ReactNode
  fromDate?: Date
  toDate?: Date
  onFormChange: (
    name: string,
    value: unknown,
    shouldValidate?: boolean | undefined
  ) => void | Promise<boolean>
}

const FORMAT = 'MM/DD/YYYY'

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  onFormChange,
  fromDate,
  toDate,
}) => {
  const [from, setFrom] = useState<Date>(fromDate as Date)
  const [to, setTo] = useState<Date>(toDate as Date)
  const toRef = useRef<DayPickerInput>(null)

  const modifiers = { start: from, end: to }

  const showFromMonth = (): void => {
    if (!from) return
    if (toRef && toRef.current && dayjs(to).diff(dayjs(from), 'month') < 2) {
      toRef.current.getDayPicker().showMonth(from)
    }
  }

  const handleFromChange: DayPickerInputProps['onDayChange'] = startDate => {
    setFrom(startDate)
    onFormChange('startDate', startDate)
  }

  const handleToChange: DayPickerInputProps['onDayChange'] = endDate => {
    setTo(endDate)
    onFormChange('endDate', endDate)
    showFromMonth()
  }

  const onDayClick: DayPickerProps['onDayClick'] = () => {
    if (toRef && toRef.current) {
      toRef.current.getInput().focus()
    }
  }

  return (
    <div className="InputFromTo">
      <DayPickerInput
        value={from}
        placeholder="From"
        format={FORMAT}
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={{
          selectedDays: [from, { from, to }],
          disabledDays: { after: to },
          toMonth: to,
          modifiers,
          numberOfMonths: 2,
          onDayClick,
        }}
        onDayChange={handleFromChange}
      />
      {' — '}
      <span className="InputFromTo-to">
        <DayPickerInput
          ref={toRef}
          value={to}
          placeholder="To"
          format={FORMAT}
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { before: from },
            modifiers,
            month: from,
            fromMonth: from,
            numberOfMonths: 2,
          }}
          onDayChange={handleToChange}
        />
      </span>
    </div>
  )
}

export default DateRangePicker
