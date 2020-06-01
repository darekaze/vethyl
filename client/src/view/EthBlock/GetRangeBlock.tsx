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
} from 'rsuite'
import { ResponseCodeBlock } from 'components/ResponseCodeBlock'

interface RangeBlockFormData {
  start: number
  end: number
}

export const GetEthRangeBlock: React.FC = () => {
  const { control, handleSubmit } = useForm<RangeBlockFormData>()
  const queryResult = useStoreState((state) => state.block.payload)
  const fetchBlocks = useStoreActions((actions) => actions.block.fetchRangeBlocks)

  const onSubmit = useCallback(
    async (data: RangeBlockFormData) => {
      const { start, end } = data
      await fetchBlocks({ start, end })
    },
    [fetchBlocks],
  )

  return (
    <Layout title="Search for Range of Blocks">
      <Panel bordered>
        <Form onSubmit={(_, event) => handleSubmit(onSubmit)(event)}>
          <FormGroup>
            <ControlLabel>Starting Block No.</ControlLabel>
            <Controller
              as={FormControl}
              name="start"
              control={control}
              defaultValue=""
              placeholder="e.g. 2786000"
            />
            <HelpBlock>Required</HelpBlock>
          </FormGroup>

          <FormGroup>
            <ControlLabel>Ending Block No.</ControlLabel>
            <Controller
              as={FormControl}
              name="end"
              control={control}
              defaultValue=""
              placeholder="e.g. 2786100"
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
