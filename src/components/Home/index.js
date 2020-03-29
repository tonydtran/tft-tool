import React from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const Home = ({ history }) => {
  return (
    <Container>
      <Banner />
      <Content>
        <h3 className="text-center mb-4">Build the best teams</h3>
        <p>Our intuitive builder will let you create precise compositions.</p>
        <p>... add content</p>
        <Button
          className="mt-5"
          variant="outline-info"
          size="lg"
          block
          onClick={() => history.push('/signup')}
        >
          Get started
        </Button>
        <p className="text-center mt-4">
          Already have an account? <Link to="/signin">Sign in here!</Link>
        </p>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: block;
  margin: -1rem -1rem -2rem;
`

const Content = styled.div`
  display: block;
  margin: 2rem 1rem;
`

const Banner = styled.div`
  display: block;
  height: calc(100vh - 230.375px);
  background-image: url('/assets/images/banner.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export default React.memo(Home)
