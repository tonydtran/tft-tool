import React, { Component } from 'react'
// import styled from 'styled-components'

import BoardSet from '../../models/BoardSet'
import champions from '../../data/champions.json'

import Board from './Board'
// TODO extract board logic into another component
class Builder extends Component {
  constructor (props) {
    super(props)

    const defaultBoard = new BoardSet()

    this.state = {
      collection: {
        id: 'test',
        boards: [
          {
            ...defaultBoard,
            board: {
              a: { ...defaultBoard.board.a, a4: { ...defaultBoard.board.a.a4, champ: champions['ahri'], carry: false, items: [1, 2, 3] } },
              b: { ...defaultBoard.board.b, b4: { ...defaultBoard.board.b.b4, champ: champions['syndra'] }, b5: { ...defaultBoard.board.b.b5, champ: champions['zoe'] } },
            }
          }
        ]
      }
    }
  }

  handleChangePosition = (origin, target) => {
    if (origin.id !== target.id) {
      const { collection: { boards } } = this.state
      const { board: boardData } = boards[0]

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

      this.setState({
        collection: {
          ...this.state.collection,
          boards: [
            {
              ...this.state.collection.boards[0],
              board: boardData
            }
          ]
        }
      })
    }
  }

  render () {
    const { collection: { boards } } = this.state
    const { board: boardData } = boards[0]

    return (
      <>
        <h1>Builder</h1>
        <Board boardData={boardData} onChange={this.handleChangePosition} />
      </>
    )
  }
}

export default Builder
