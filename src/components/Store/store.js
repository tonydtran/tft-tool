import React, { PureComponent } from 'react'

import StoreContext from './context'
import { FirebaseContext } from '../Firebase'
import Message from '../../models/Message'

import itemSet from '../../data/items.json'
import championSet from '../../data/champions.json'
import traitSet from '../../data/traits.json'

class StoreProvider extends PureComponent {
  static contextType = FirebaseContext
  constructor(props) {
    super(props)

    this.state = {
      messages: [],
      viewport: window.innerWidth >= 992 ? 'desktop' : 'mobile',
      itemSet,
      championSet,
      traitSet
    }
  }

  async componentDidMount() {
    window.addEventListener('resize', this.updateViewport)

    // TODO: load here data (champs, items, etc)
    // But need admin interface first to upload data to upload data to firebase
  }

  updateViewport = () => {
    // TODO: handle later tablet view
    const { viewport } = this.state

    if (viewport === 'desktop' && window.innerWidth < 992) {
      this.setState({
        viewport: 'mobile'
      })
    }

    if (viewport === 'mobile' && window.innerWidth >= 992) {
      this.setState({
        viewport: 'desktop'
      })
    }
  }

  addMessage = (title, body, duration) => {
    const message = new Message(title, body, duration)
    const messages = [...this.state.messages, message]
    this.setState({ messages })
  }

  deleteMessage = id => {
    const { messages } = this.state
    if (messages.length > 0) {
      this.setState({
        messages: messages.filter(message => message.id !== id)
      })
    }
  }

  clearMessages = () => {
    this.setState({ messages: [] })
  }

  render () {
    const { children } = this.props

    return (
      <StoreContext.Provider value={this}>
        {children()}
      </StoreContext.Provider>
    )
  }
}

export default StoreProvider
