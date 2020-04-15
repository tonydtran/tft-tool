import React, { PureComponent } from 'react'
import styled from 'styled-components'
import Modal from 'react-bootstrap/Modal'
import ShowMoreText from 'react-show-more-text'

import Board from './Board'
import BoardEdit from '../menus/BoardEdit'
import BoxEdit from '../menus/BoxEdit'

class BoardMaker extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      id: props.id,
      title: props.title,
      text: props.text || '',
      traits: props.traits || [],
      board: props.board,
      selectedBox: null
    }
  }

  handleUpdatelocalBoardAndBuild = newBoard => {
    this.setState({ board: newBoard }, () => {
      const { updateBoard } = this.props
      const { id, title, text, traits, board } = this.state

      updateBoard({ id, title, text, traits, board })
    })
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

    this.handleUpdatelocalBoardAndBuild(board)
  }

  handleChangePosition = (origin, target, boardId) => {
    const { id, board } = this.state

    if ((id === boardId) && (origin.id !== target.id)) {

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

      this.handleUpdatelocalBoardAndBuild(board)
    }
  }

  handleAddChamp = (champ, box) => {
    const { board } = this.state

    board[box.row][box.id] = {
      ...board[box.row][box.id],
      champ,
      items: [],
      carry: false
    }

    this.handleUpdatelocalBoardAndBuild(board)
  }

  handleAddItem = (item, box) => {
    const { board } = this.state
    const targetBox = board[box.row][box.id]
    const targetBoxItem = board[box.row][box.id].items
      ? board[box.row][box.id].items
      : []

    if (
      targetBox.champ &&
      targetBox.champ.id &&
      targetBoxItem.length < 3
    ) {
      board[box.row][box.id] = {
        ...targetBox,
        items: [...targetBoxItem, item]
      }
    }

    this.handleUpdatelocalBoardAndBuild(board)
  }

  handleDeleteItem = (item, box) => {
    const { board } = this.state
    const targetBox = board[box.row][box.id]
    const targetBoxItem = board[box.row][box.id].items

    board[box.row][box.id] = {
      ...targetBox,
      items: targetBoxItem.filter(currentItem => currentItem !== item)
    }

    this.handleUpdatelocalBoardAndBuild(board)
  }

  render () {
    const { openModals, toggleModal, deleteBoard, toggleTrash } = this.props
    const { id, title, text, board, selectedBox } = this.state

    return (
      <Container>
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
          <ShowMoreText more="show more" less="Show less" keepNewLines={true}>
            {text}
          </ShowMoreText>
        </div>
        <Board
          boardData={board}
          boardId={id}
          onChange={this.handleChangePosition}
          onClick={this.handleToggleChampEditModal}
          onAddChamp={this.handleAddChamp}
          onAddItem={this.handleAddItem}
          onRemoveItem={this.handleDeleteItem}
          toggleTrash={toggleTrash}
        />
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
      </Container>
    )
  }
}

const Container = styled.div`
  margin-bottom: 3rem;
`

const I = styled.i`
  &:hover, &:active {
    transform: scale(1.3);
    cursor: pointer;
    transition: transform 300ms;
  }
`

export default BoardMaker
