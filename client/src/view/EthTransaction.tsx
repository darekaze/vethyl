import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useStoreState } from 'app/hooks'
import { Layout } from 'components/Layout'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Panel,
  Button,
  ButtonToolbar,
  DateRangePicker,
} from 'rsuite'

interface TxnFormData {
  dateRange: [Date, Date]
  fromAcct: string
  toAcct: string
}

const EthTransaction: React.FC = () => {
  const { control, handleSubmit } = useForm<TxnFormData>()
  const queryResult = useStoreState((state) => state.transaction.payload)

  const onSubmit = (data: any) => {
    // Call thunk
    console.log(data)
  }

  return (
    <Layout title="Search for Transaction">
      <Panel bordered>
        <Form onSubmit={(_, event) => handleSubmit(onSubmit)(event)}>
          <FormGroup>
            <ControlLabel>Range of Date</ControlLabel>
            <Controller
              as={DateRangePicker}
              name="dateRange"
              control={control}
              defaultValue={[]}
              placeholder="Transactions occur period"
              onChange={([dates]) => dates}
              style={{ width: '300px' }}
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Sender Account</ControlLabel>
            <Controller
              as={FormControl}
              name="fromAcct"
              control={control}
              defaultValue=""
              placeholder="Sender's address"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Receiver Account</ControlLabel>
            <Controller
              as={FormControl}
              name="toAcct"
              control={control}
              defaultValue=""
              placeholder="Receiver's address"
            />
          </FormGroup>

          <ButtonToolbar>
            <Button appearance="primary" type="submit">
              Submit
            </Button>
          </ButtonToolbar>
        </Form>
      </Panel>
    </Layout>
  )
}

export default EthTransaction
