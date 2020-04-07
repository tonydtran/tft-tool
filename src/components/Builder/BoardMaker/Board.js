import React from 'react'
import styled from 'styled-components'

import Box from './Box'

const Board = ({ boardData, onChange }) => {
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
                    onChange={onChange}
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
