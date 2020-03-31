import React, { useContext } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import { AuthUserContext } from '../Session'
import viewports from '../../vars/viewports'

const Home = ({ history }) => {
  const authUser = useContext(AuthUserContext)

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
          onClick={() => history.push(authUser ? '/builds' : '/signup')}
        >
          Get started
        </Button>
        <p className="text-center mt-4">
          Already have an account? <Link to={authUser ? '/builds' : '/signin'}>Sign in here!</Link>
        </p>
      </Content>
    </Container>
  )
}

const Container = styled.div`
  position: relative;
  display: block;
  margin-top: -1rem;
`

const Content = styled.div`
  display: block;
  padding: 2rem 1rem 1rem;
`

const Banner = styled.div`
  display: block;
  height: calc(100vh - 230.375px);
  background-image: url('/assets/images/banner-1x.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  @media ${viewports.desktop} {
    background-image: url('/assets/images/banner-2x.png');
  }
`

export default React.memo(Home)
