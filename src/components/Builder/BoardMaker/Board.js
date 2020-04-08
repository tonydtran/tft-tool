import React from 'react'
import styled from 'styled-components'

import { countChamp } from '../../../helpers/board'
import Box from './Box'

const Board = ({ boardData, boardId, onChange, onClick }) => {
  const canAddChamp = countChamp(boardData) < 10

  return (
    <div className="d-flex justify-content-center">
      <div className="d-flex flex-column">
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
                    canAddChamp={canAddChamp}
                  />
                ))
              }
            </Row>
          ))
        }
      </div>
    </div>
  )
}

const Row = styled.div`
  display: inline-flex;

  &:nth-child(even) {
    margin-left: 6vw;
  }

  > * + * {
    margin-left: 2vw;
  }
`

export default Board
