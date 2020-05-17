import React from 'react'
import { Container, Header, Content } from 'rsuite'

type LayoutProps = {
  title: string
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <Container
      style={{
        padding: '36px 32px 40px',
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
