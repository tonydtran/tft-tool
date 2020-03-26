import React, { Component } from 'react'
// import styled from 'styled-components'

import { BOARD } from '../../vars/game'
import champions from '../../data/champions.json'

import Board from './Board'

class Builder extends Component {
  constructor (props) {
    super(props)

    this.state = {
      boardData: {
        ...BOARD,
        a: {...BOARD.a, a4: { ...BOARD.a.a4, champ: champions['ahri'], carry: true }},
        b: { ...BOARD.b, b4: { ...BOARD.b.b4, champ: champions['syndra'] }, b5: { ...BOARD.b.b5, champ: champions['zoe'] }},
      }
    }
    // this.state = {
    //   boardData: BOARD
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
