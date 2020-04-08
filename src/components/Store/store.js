import React, { Component } from 'react'

import StoreContext from './context'
import { FirebaseContext } from '../Firebase'
import Message from '../../models/Message'

class StoreProvider extends Component {
  static contextType = FirebaseContext
  constructor(props) {
    super(props)

    this.state = {
      messages: []
    }
  }

  async componentDidMount() {
    // TODO: load here data (champs, items, etc)
    // But need admin interface first to upload data to upload data to firebase
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
