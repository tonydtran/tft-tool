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
    return this.setState({ messages }, () => this.state.messages)
  }

  deleteMessage = id => {
    const { messages } = this.state
    if (messages.length > 0) {
      return this.setState({
        messages: messages.filter(message => message.id !== id)
      }, () => this.state.messages)
    }

    return messages
  }

  clearMessages = () => {
    return this.setState({ messages: [] }, () => this.state.message)
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
