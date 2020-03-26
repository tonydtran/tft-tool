import React, { PureComponent } from 'react'
// import styled from 'styled-components'

import { BOARD } from '../../vars/game'
import champions from '../../data/champions.json'

import Board from './Board'

class Builder extends PureComponent {
  constructor (props) {
    super(props)

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

  handleChangePosition = (origin, target) => {
    const { boardData } = this.state

    const updatedBoardData = {
      ...boardData,
      [target.row]: {
        ...boardData[target.row],
        [target.id]: {
          ...boardData[target.row][target.id],
          champ: origin.champ,
          items: origin.items
        }
      },
      [origin.row]: {
        ...boardData[origin.row],
        [origin.id]: {
          ...boardData[origin.row][origin.id],
          champ: target.champ ? target.champ : null,
          items: target.items ? target.champ : []
        }
      }
    }

    this.setState({ boardData: updatedBoardData })
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
