import React, { useState, useRef, ReactNode } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import { DayPickerInputProps, DayPickerProps } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import { formatDate, parseDate } from 'utils/date'
import './style.css'

interface DateRangePickerProps {
  children?: ReactNode
  getFormValues: Function // useForm types
  handleFromChange: DayPickerInputProps['onDayChange']
  handleToChange: DayPickerInputProps['onDayChange']
}

const FORMAT = 'MM/DD/YYYY'

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  getFormValues,
  handleFromChange,
  handleToChange,
}) => {
  // TODO: put local state
  // TODO: refactor using https://webomnizz.com/change-parent-component-state-from-child-using-hooks-in-react/
  const toRef = useRef<DayPickerInput>(null)

  const { startDate, endDate } = getFormValues()
  const modifiers = { start: startDate, end: endDate }

  const onDayClick: DayPickerProps['onDayClick'] = () => {
    if (toRef && toRef.current) {
      toRef.current.getInput().focus()
    }
  }

  return (
    <div className="InputFromTo">
      <DayPickerInput
        value={startDate}
        placeholder="From"
        format={FORMAT}
        formatDate={formatDate}
        parseDate={parseDate}
        dayPickerProps={{
          selectedDays: [startDate, { startDate, endDate }],
          disabledDays: { after: endDate },
          toMonth: endDate,
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
          value={endDate}
          placeholder="To"
          format={FORMAT}
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [startDate, { startDate, endDate }],
            disabledDays: { before: startDate },
            modifiers,
            month: startDate,
            fromMonth: startDate,
            numberOfMonths: 2,
          }}
          onDayChange={handleToChange}
        />
      </span>
    </div>
  )
}

export default DateRangePicker
