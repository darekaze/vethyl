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

interface BlockFormData {
  block: string
}

export const GetEthBlock: React.FC = () => {
  const { control, handleSubmit } = useForm<BlockFormData>()
  const queryResult = useStoreState((state) => state.block.payload)
  const fetchBlock = useStoreActions((actions) => actions.block.fetchBlock)

  const onSubmit = useCallback(
    async (data: BlockFormData) => {
      await fetchBlock({ query: data.block })
    },
    [fetchBlock],
  )

  return (
    <Layout title="Search for Block">
      <Panel bordered>
        <Form onSubmit={(_, event) => handleSubmit(onSubmit)(event)}>
          <FormGroup>
            <ControlLabel>Block hash / number</ControlLabel>
            <Controller
              as={FormControl}
              name="block"
              control={control}
              defaultValue=""
              placeholder="Hash or number"
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
