import React, { PureComponent } from 'react'
// import styled from 'styled-components'

import { BOARD } from '../../vars/game'
import champions from '../../data/champions.json'

import Board from './Board'

class Builder extends PureComponent {
  constructor () {
    super()

    this.state = {
      boardData: {
        ...BOARD,
        a: {...BOARD.a, a4: { ...BOARD.a.a4, champ: champions['ahri'] }},
        b: { ...BOARD.b, b4: { ...BOARD.b.b4, champ: champions['syndra'] }, b5: { ...BOARD.b.b5, champ: champions['zoe'] }},
      }
    }
    // this.state = {
    //   boardData: BOARD
    // }
  }

  render () {
    const { boardData } = this.state

    return (
      <>
        <h1>Builder</h1>
        <Board boardData={boardData} />
      </>
    )
  }
}

export default Builder
