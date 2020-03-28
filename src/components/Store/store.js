import React, { Component } from 'react'

import StoreContext from './context'

class StoreProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }
  }

  addMessage = message => {
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
