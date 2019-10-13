import React from 'react'
import { Container, Header } from 'semantic-ui-react'

const Home: React.FC = () => {
  return (
    <Container text style={{ marginTop: '3em' }}>
      <Header as="h1">VQL-Client</Header>
      <p>Welcome to use the query client!</p>
    </Container>
  )
}

export default Home
