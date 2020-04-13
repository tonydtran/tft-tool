import React from 'react'
import styled from 'styled-components'

import { countChamp } from '../../../helpers/board'
import Box from './Box'

const Board = ({
  boardData,
  boardId,
  onChange,
  onClick,
  onAddChamp,
  onAddItem,
  onRemoveItem,
  toggleTrash
}) => {
  const canAddChamp = countChamp(boardData) < 10

  return (
    <div className="d-flex justify-content-center">
      <Container>
        {
          Object.keys(boardData).map(row => (
            <Row key={`row-${row}`}>
              {
                Object.keys(boardData[row]).map(box => (
                  <Box
                    key={boardData[row][box].id}
                    data={boardData[row][box]}
                    boardId={boardId}
                    onChange={onChange}
                    onClick={onClick}
                    onAddChamp={onAddChamp}
                    onAddItem={onAddItem}
                    onRemoveItem={onRemoveItem}
                    canAddChamp={canAddChamp}
                    toggleTrash={toggleTrash}
                  />
                ))
              }
            </Row>
          ))
        }
      </Container>
    </div>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Row = styled.div`
  position: relative;
  display: flex;
  margin-bottom: calc(100% / 40);

  &:nth-child(even) {
    margin-left: calc(100% / 15);
  }

  &:nth-child(odd) {
    margin-right: calc(100% / 15);
  }

  > * + * {
    margin-left: calc(100% / 40);
  }
`

export default Board
