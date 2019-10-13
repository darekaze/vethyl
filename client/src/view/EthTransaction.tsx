import React, { useEffect, ChangeEvent } from 'react'
import { Container, Header, Form } from 'semantic-ui-react'
import useForm from 'react-hook-form'
import { useStoreState } from '../hooks'

interface FormData {
  // startDate: string
  // endDate: string
  fromAcct: string
  toAcct: string
  // // should be number?
  // valuePeak: string
  // valueBottom: string
}

const EthTransaction: React.FC = () => {
  const { register, handleSubmit, setValue } = useForm<FormData>()
  const queryResult = useStoreState(state => state.transaction.payload)

  const handleChange = (e: ChangeEvent, { name, value }: any): void => {
    setValue(name, value)
  }

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  useEffect(() => {
    register({ name: 'fromAcct' })
    register({ name: 'toAcct' })
  })

  return (
    <Container text style={{ marginTop: '3rem' }}>
      <Header as="h1">Check Transaction</Header>
      <Form onSubmit={onSubmit}>
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
