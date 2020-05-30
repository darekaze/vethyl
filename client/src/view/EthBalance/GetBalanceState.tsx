import React, { useCallback } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  Panel,
  Button,
  ButtonToolbar,
} from 'rsuite'
import { useStoreState, useStoreActions } from 'app/hooks'
import { Layout } from 'components/Layout'
import { ResponseCodeBlock } from 'components/ResponseCodeBlock'

interface BalanceStateFormData {
  address: string
}

export const GetEthBalanceState: React.FC = () => {
  const { control, handleSubmit } = useForm<BalanceStateFormData>()
  const queryResult = useStoreState((state) => state.balance.payload)
  const fetchAccountBalance = useStoreActions(
    (actions) => actions.balance.fetchAccountBalance,
  )

  const onSubmit = useCallback(
    async (data: BalanceStateFormData) => {
      await fetchAccountBalance(data.address)
    },
    [fetchAccountBalance],
  )

  return (
    <Layout title="Balance Checker">
      <Panel bordered>
        <Form onSubmit={(_, event) => handleSubmit(onSubmit)(event)}>
          <FormGroup>
            <ControlLabel>Account Address</ControlLabel>
            <Controller
              as={FormControl}
              name="address"
              control={control}
              defaultValue=""
              placeholder="Enter wallet address here"
            />
            <HelpBlock>Required</HelpBlock>
          </FormGroup>

          <ButtonToolbar>
            <Button appearance="primary" type="submit">
              Search
            </Button>
          </ButtonToolbar>
        </Form>
      </Panel>
      <ResponseCodeBlock code={JSON.stringify(queryResult, null, 2)} />
    </Layout>
  )
}
