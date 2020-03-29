import React, { Component } from 'react'
import styled from 'styled-components'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)

    this.state = {
      hasError: false
    }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Connect with Firebase or Sentry to catch log error
  }

  render () {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) return (
      <>
        <Img src="/assets/images/teemo.png" alt="teemo" />
        <div className="text-center">
          <h4>Oops! Something went wrong</h4>
          <p>Please reload the page and retry or try later</p>
        </div>
      </>
    )

    return children
  }
}

const Img = styled.img`
  width: 190px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -80px;
  margin-top: -120px;
`

export default ErrorBoundary
