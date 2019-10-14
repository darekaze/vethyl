import React, { useEffect } from 'react'
import { Container, Header, Form, StrictInputProps } from 'semantic-ui-react'
import useForm from 'react-hook-form'
import { DayPickerInputProps } from 'react-day-picker'
import 'react-day-picker/lib/style.css'

import DateRangePicker from 'components/shared/DateRangePicker'
import { useStoreState } from '../hooks'

interface FormData {
  startDate: Date
  endDate: Date
  fromAcct: string
  toAcct: string
  // // should be number?
  // valuePeak: string
  // valueBottom: string
}

const EthTransaction: React.FC = () => {
  const { register, handleSubmit, setValue, getValues } = useForm<FormData>()
  const queryResult = useStoreState(state => state.transaction.payload)

  const handleChange: StrictInputProps['onChange'] = (e, { name, value }): void => {
    setValue(name, value)
  }

  const handleFromChange: DayPickerInputProps['onDayChange'] = (day): void => {
    setValue('startDate', day)
  }

  const handleToChange: DayPickerInputProps['onDayChange'] = (day): void => {
    setValue('endDate', day)
  }

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  useEffect(() => {
    register({ name: 'startDate' })
    register({ name: 'endDate' })
    register({ name: 'fromAcct' })
    register({ name: 'toAcct' })
  })

  return (
    <Container text style={{ marginTop: '3rem' }}>
      <Header as="h1">Check Transaction</Header>
      <Form onSubmit={onSubmit}>
        {/* Can put date range picker in one component? */}
        <DateRangePicker
          getFormValues={getValues}
          handleFromChange={handleFromChange}
          handleToChange={handleToChange}
        />
        <Form.Group widths="equal">
          <Form.Input
            name="fromAcct"
            label="From Account"
            placeholder="Enter Sender Account"
            onChange={handleChange}
          />
          <Form.Input
            name="toAcct"
            label="To Account"
            placeholder="Enter Receiver Account"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    </Container>
  )
}

export default EthTransaction
