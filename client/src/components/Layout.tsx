import React from 'react'
import { Container, Header, Content } from 'rsuite'

type LayoutProps = {
  title: string
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <Container
      style={{
        maxWidth: '1080px',
        padding: '42px 32px 50px',
        margin: '0 auto',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}>
      <Header style={{ marginBottom: '1.2em' }}>
        <h2>{title}</h2>
      </Header>
      <Content>{children}</Content>
    </Container>
  )
}
