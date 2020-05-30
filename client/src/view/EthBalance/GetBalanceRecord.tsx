import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import dayjs from 'dayjs'
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

import { useStoreState, useStoreActions } from 'app/hooks'
import { Layout } from 'components/Layout'
import { ResponseCodeBlock } from 'components/ResponseCodeBlock'

interface BalanceRecordFormData {
  acct: string
  dateRange: [Date, Date]
}

export const GetEthBalanceRecord: React.FC = () => {
  const { control, handleSubmit } = useForm<BalanceRecordFormData>()
  const queryResult = useStoreState((state) => state.balance.payload)
  const fetchRecords = useStoreActions(
    (actions) => actions.balance.fetchBalanceRecords,
  )

  const onSubmit = useCallback(
    async (data: BalanceRecordFormData) => {
      await fetchRecords({
        addr: data.acct,
        start: dayjs(data.dateRange[0]).format('YYYY-MM-DD'),
        end: dayjs(data.dateRange[1]).format('YYYY-MM-DD'),
      })
    },
    [fetchRecords],
  )

  return (
    <Layout title="Search for Balance Records">
      <Panel bordered>
        <Form onSubmit={(_, event) => handleSubmit(onSubmit)(event)}>
          <FormGroup>
            <ControlLabel>Account Address</ControlLabel>
            <Controller
              as={FormControl}
              name="acct"
              control={control}
              defaultValue=""
              placeholder="Enter wallet address here"
            />
          </FormGroup>

          <FormGroup>
            <ControlLabel>Range of Date</ControlLabel>
            <Controller
              as={DateRangePicker}
              name="dateRange"
              control={control}
              defaultValue={[]}
              placeholder=""
              onChange={([dates]) => dates}
              style={{ width: '300px' }}
            />
            <HelpBlock>Required</HelpBlock>
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
