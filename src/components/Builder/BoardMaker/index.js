import React, { Component } from 'react'
// import styled from 'styled-components'

import champions from '../../../data/champions.json'

import Board from './Board'

class BoardMaker extends Component {
  constructor (props) {
    super(props)

    const demoBoard = props.board
    demoBoard.a.a4 = { ...props.board.a.a4, champ: champions['ahri'], carry: false, items: [1, 2, 3] }
    demoBoard.b.b4 = { ...props.board.b.b4, champ: champions['syndra'] }
    demoBoard.b.b5 = { ...props.board.b.b5, champ: champions['zoe'] }

    this.state = {
      id: props.id,
      name: props.name,
      note: props.note,
      traits: props.traits,
      // board: props.board
      board: demoBoard
    }
  }

  handleChangePosition = (origin, target) => {
    if (origin.id !== target.id) {
      const { board } = this.state

      board[target.row][target.id] = {
        ...target,
        champ: origin.champ,
        items: origin.items,
        carry: origin.carry
      }

      board[origin.row][origin.id] = {
        ...origin,
        champ: target.champ,
        items: target.items,
        carry: target.carry
      }

      this.setState({ board })
    }
  }

  render () {
    const { name, board } = this.state

    return (
      <>
        <div className="mb-4">
          <h4 className="font-weight-bold">Early game</h4>
          {/* <h4>{name}</h4> */}
          <p>Early game you want to focus on Cyborgs like Leona, Fiora...</p>
        </div>
        <Board boardData={board} onChange={this.handleChangePosition} />
      </>
    )
  }
}

export default BoardMaker
