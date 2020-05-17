import React from 'react'
import { Container, Header, Content } from 'rsuite'

type LayoutProps = {
  title: string
}

export const Layout: React.FC<LayoutProps> = ({ title, children }) => {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        overflowX: 'hidden',
        overflowY: 'auto',
      }}>
      <Container
        style={{
          maxWidth: '1080px',
          padding: '42px 32px 50px',
          margin: '0 auto',
          flexDirection: 'column',
        }}>
        <Header style={{ marginBottom: '1.2em' }}>
          <h2>{title}</h2>
        </Header>
        <Content>{children}</Content>
      </Container>
    </div>
  )
}
