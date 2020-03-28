import React, { Component } from 'react'
// import styled from 'styled-components'

import BoardSet from '../../models/BoardSet'
import champions from '../../data/champions.json'

import Board from './Board'

class Builder extends Component {
  constructor (props) {
    super(props)

    const defaultBoard = new BoardSet()

    this.state = {
      boardData: {
        ...defaultBoard,
        a: {...defaultBoard.a, a4: { ...defaultBoard.a.a4, champ: champions['ahri'], carry: false, items: [1, 2, 3] }},
        b: { ...defaultBoard.b, b4: { ...defaultBoard.b.b4, champ: champions['syndra'] }, b5: { ...defaultBoard.b.b5, champ: champions['zoe'] }},
      }
    }
    // this.state = {
    //   boardData: new BoardSet()
    // }
  }

  handleChangePosition = (origin, target) => {
    if (origin.id !== target.id) {
      const { boardData } = this.state

      boardData[target.row][target.id] = {
        ...target,
        champ: origin.champ,
        items: origin.items,
        carry: origin.carry
      }

      boardData[origin.row][origin.id] = {
        ...origin,
        champ: target.champ,
        items: target.items,
        carry: target.carry
      }

      this.setState({ boardData })
    }
  }

  render () {
    const { boardData } = this.state

    return (
      <>
        <h1>Builder</h1>
        <Board boardData={boardData} onChange={this.handleChangePosition} />
      </>
    )
  }
}

export default Builder
