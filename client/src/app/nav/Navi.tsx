import React, { useState, CSSProperties } from 'react'
import { useHistory } from 'react-router-dom'
import { Sidebar, Sidenav, Nav, Navbar, Icon } from 'rsuite'

const headerStyles: CSSProperties = {
  padding: 18,
  fontSize: 16,
  height: 56,
  background: '#34c3ff',
  color: ' #fff',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
}

const NavigationBar: React.FC = () => {
  const [activeKey, setActiveKey] = useState('')
  const [expand, setExpand] = useState(true)
  const history = useHistory()

  const handleSelect = (eventKey: string) => {
    setActiveKey(eventKey)
    history.push(`/${eventKey}`)
    console.log(eventKey)
  }

  const handleToggle = () => {
    setExpand(!expand)
  }

  return (
    <Sidebar
      style={{
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 4px 4px rgba(0,0,0,.12),0 0 10px rgba(0,0,0,.06)',
      }}
      width={expand ? 260 : 56}
      collapsible>
      <Sidenav.Header>
        <div style={headerStyles}>
          <Icon icon="logo-analytics" size="lg" style={{ verticalAlign: 0 }} />
          <span style={{ marginLeft: 12 }}> VQL Client</span>
        </div>
      </Sidenav.Header>
      <Sidenav
        expanded={expand}
        activeKey={activeKey}
        onSelect={handleSelect}
        appearance="subtle"
        style={{ flex: '1 1 auto', overflowY: 'auto' }}>
        <Sidenav.Body>
          <Nav>
            <Nav.Item eventKey="" icon={<Icon icon="home" />}>
              Home
            </Nav.Item>
            <Nav.Item eventKey="tx" icon={<Icon icon="exchange" />}>
              Transaction
            </Nav.Item>
            <Nav.Item eventKey="block" icon={<Icon icon="link" />}>
              Block
            </Nav.Item>
            <Nav.Item eventKey="balance" icon={<Icon icon="money" />}>
              Balance
            </Nav.Item>
            {/* <Nav.Item eventKey="mobility" icon={<Icon icon="bicycle" />}>
              Mobility
            </Nav.Item> */}
          </Nav>
        </Sidenav.Body>
      </Sidenav>
      <Navbar appearance="subtle" style={{ borderTop: '1px solid #e5e5ea' }}>
        <Navbar.Body>
          <Nav pullRight>
            <Nav.Item
              onClick={handleToggle}
              style={{ width: 56, textAlign: 'center' }}>
              <Icon icon={expand ? 'angle-left' : 'angle-right'} />
            </Nav.Item>
          </Nav>
        </Navbar.Body>
      </Navbar>
    </Sidebar>
  )
}

export default NavigationBar
