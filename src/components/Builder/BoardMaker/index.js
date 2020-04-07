import React, { Component } from 'react'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'

// import champions from '../../../data/champions.json'

import Board from './Board'
import BoardEdit from '../menus/BoardEdit'
import BoxEdit from '../menus/BoxEdit'

class BoardMaker extends Component {
  constructor (props) {
    super(props)

    // const demoBoard = props.board
    // demoBoard.a.a4 = { ...props.board.a.a4, champ: champions['ahri'], carry: false, items: [1, 2, 3] }
    // demoBoard.b.b4 = { ...props.board.b.b4, champ: champions['syndra'] }
    // demoBoard.b.b5 = { ...props.board.b.b5, champ: champions['zoe'] }

    this.state = {
      id: props.id,
      title: props.title,
      text: props.text || '',
      traits: props.traits || [],
      board: props.board,
      // board: demoBoard,
      selectedBox: null
    }
  }

  handleChangeTitleAndText = (title, text) => {
    this.setState({ title, text }, () => {
      const { updateBoard } = this.props
      const { id, title, text, traits, board } = this.state

      updateBoard({ id, title, text, traits, board })
    })
  }

  handleToggleChampEditModal = ({ id: boxId, row }) => {
    const { openModals, toggleModal } = this.props
    const { id } = this.state

    if (openModals[`boxEdit-${id}`]) {
      this.setState({ selectedBox: null }, () => {
        toggleModal(`boxEdit-${id}`)
      })
    } else {
      this.setState({ selectedBox: { id: boxId, row } }, () => {
        toggleModal(`boxEdit-${id}`)
      })
    }
  }

  handleUpdateBox = ({ boxId, row, champ, carry, items }) => {
    const { board } = this.state

    board[row][boxId] = {
      ...board[row][boxId],
      champ,
      items: champ.id ? items : [],
      carry
    }

    this.setState({ board })
  }

  handleChangePosition = (origin, target) => {
    if (origin.id !== target.id) {
      const { board } = this.state

      board[target.row][target.id] = {
        ...target,
        champ: origin.champ || null,
        items: origin.items || [],
        carry: origin.carry
      }

      board[origin.row][origin.id] = {
        ...origin,
        champ: target.champ || null,
        items: target.items || [],
        carry: target.carry
      }

      this.setState({ board }, () => {
        const { updateBoard } = this.props
        const { id, title, text, traits, board } = this.state

        updateBoard({ id, title, text, traits, board })
      })
    }
  }

  render () {
    const { openModals, toggleModal, deleteBoard } = this.props
    const { id, title, text, board, selectedBox } = this.state

    return (
      <>
        <div className="mb-4">
          <div className="d-flex align-items-baseline">
            <h4 className="d-inline-block text-truncate font-weight-bold">
              {title}
            </h4>
            <I
              className="fas fa-edit fa-smd text-success ml-2"
              onClick={() => toggleModal(`boardEdit-${id}`)}
            />
          </div>
          <p className="text-break">{text}</p>
        </div>
        <Board boardData={board} onChange={this.handleChangePosition} onClick={this.handleToggleChampEditModal} />
        <Modal
          show={openModals[`boardEdit-${id}`]}
          onHide={() => toggleModal(`boardEdit-${id}`)}
          centered
        >
          <BoardEdit
            id={id}
            title={title}
            text={text}
            onHide={() => toggleModal(`boardEdit-${id}`)}
            saveBoard={this.handleChangeTitleAndText}
            deleteBoard={deleteBoard}
          />
        </Modal>
        <Modal
          show={openModals[`boxEdit-${id}`]}
          onHide={() => toggleModal(`boxEdit-${id}`)}
          centered
        >
          {selectedBox && (
            <BoxEdit
              {...board[selectedBox.row][selectedBox.id]}
              onBoxUpdate={this.handleUpdateBox}
            />
          )}
        </Modal>
      </>
    )
  }
}

const I = styled.i`
  &:hover, &:active {
    transform: scale(1.3);
    cursor: pointer;
    transition: transform 300ms;
  }
`

export default BoardMaker
