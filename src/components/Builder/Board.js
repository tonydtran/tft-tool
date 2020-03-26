import React from 'react'
import styled from 'styled-components'

const Board = ({ boardData }) => {
  return (
    <Container>
      {
        Object.keys(boardData).map(row => (
          <Row key={`row-${row}`}>
            {
              Object.keys(boardData[row]).map(box => (
                <Box key={boardData[row][box].id} {...boardData[row][box]} />
              ))
            }
          </Row>
        ))
      }
    </Container>
  )
}

const Box = styled.div`
  height: 2.4rem;
  width: 2.4rem;
  background-color: #767D92;
  box-shadow: ${({ champ }) => {
    if (champ) {
      switch(champ.cost) {
        case 2: return `0 0 1px 3px #11b288;`
        case 3: return `0 0 1px 3px #207ac7;`
        case 4: return `0 0 1px 3px #c440da;`
        case 5: return `0 0 1px 3px #ffb93b;`
        default: return `0 0 1px 3px grey;`
      }
    } else {
      return `0 0 2px 2px black;`
    }
  }};
  border-radius: 2px;
  background-image: ${({ champ }) => champ ? `url(${champ.image})` : ''};
  background-size: contain;
`

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
