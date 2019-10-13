import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Container, Menu, Segment, MenuItemProps } from 'semantic-ui-react'

const NavigationBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('')
  const history = useHistory()

  const handleItemClick = (
    e: React.MouseEvent,
    { name = '' }: MenuItemProps
  ): void => {
    setActiveItem(name)
    history.push(`/${name}`)
  }

  return (
    <Segment fixed="top" basic inverted>
      <Menu inverted pointing secondary>
        <Container>
          <Menu.Item header onClick={handleItemClick}>
            VQL-client
          </Menu.Item>
          <Menu.Item
            name="tx"
            active={activeItem === 'tx'}
            onClick={handleItemClick}>
            Transaction
          </Menu.Item>
          <Menu.Item
            name="block"
            active={activeItem === 'block'}
            onClick={handleItemClick}>
            Block
          </Menu.Item>
          <Menu.Item
            name="balance"
            active={activeItem === 'balance'}
            onClick={handleItemClick}>
            Balance
          </Menu.Item>
          <Menu.Item
            name="mobility"
            active={activeItem === 'mobility'}
            onClick={handleItemClick}>
            Mobility
          </Menu.Item>
        </Container>
      </Menu>
    </Segment>
  )
}

export default NavigationBar
