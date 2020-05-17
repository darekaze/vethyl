import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useStoreState, useStoreActions } from 'app/hooks'
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
import dayjs from 'dayjs'
import { ResponseCodeBlock } from 'components/ResponseCodeBlock'

interface TxnFormData {
  dateRange: [Date, Date]
  fromAcct: string
  toAcct: string
}

const EthTransaction: React.FC = () => {
  const { control, handleSubmit } = useForm<TxnFormData>()
  const queryResult = useStoreState((state) => state.transaction.payload)
  const fetchTxns = useStoreActions(
    (actions) => actions.transaction.fetchTransactions,
  )

  const onSubmit = useCallback(
    async (data: TxnFormData) => {
      await fetchTxns({
        start: dayjs(data.dateRange[0]).format('YYYY-MM-DD'),
        end: dayjs(data.dateRange[1]).format('YYYY-MM-DD'),
        fromAddr: data.fromAcct,
        toAddr: data.toAcct,
      })
    },
    [fetchTxns],
  )

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
            <HelpBlock>Required</HelpBlock>
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
      <ResponseCodeBlock code={JSON.stringify(queryResult, null, 2)} />
    </Layout>
  )
}

export default EthTransaction
