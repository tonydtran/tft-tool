import React from 'react'
import styled from 'styled-components'

import Box from './Box'

const Board = ({ boardData, onChange }) => {
  return (
    <Container>
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
    </Container>
  )
}

const Row = styled.div`
  display: flex;

  &:nth-child(odd) {
    margin-left: 1.2rem;
  }

  * + * {
    margin-left: 0.6rem;
  }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;

  > * + * {
    margin-top: 0.6rem;
  }
`

export default Board
