import React, { useContext } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

import { AuthUserContext } from '../Session'
import { StoreContext } from '../Store'

const Home = ({ history }) => {
  const authUser = useContext(AuthUserContext)
  const { state: { viewport } } = useContext(StoreContext)

  return (
    <Container viewport={viewport}>
      <Banner viewport={viewport} />
      <Content viewport={viewport}>
        <h3 className="text-center mb-4">Build the best teams</h3>
        <p>Our intuitive builder will let you create precise compositions.</p>
        <p>... add content</p>
        <div className={viewport === 'desktop' ? 'd-flex justify-content-center' : undefined}>
          <Button
            className="mt-5"
            variant="outline-info"
            size="lg"
            block={viewport === 'mobile'}
            onClick={() => history.push(authUser ? '/builds' : '/signup')}
          >
            Get started
        </Button>
        </div>
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
  ${({ viewport }) => viewport === 'desktop'
    ? 'margin: -1rem -4rem 0 -4rem'
    : 'margin: -1rem 0 0'
  };
`

const Content = styled.div`
  display: block;
  padding: ${({ viewport }) => viewport === 'desktop'
    ? '4rem 8rem 2rem'
    : '2rem 1rem 1rem'
  };
`

const Banner = styled.div`
  display: block;
  height: calc(100vh - 230.375px);
  background-image: ${({ viewport }) => viewport === 'desktop'
    ? `url('/assets/images/banner-2x.png')`
    : `url('/assets/images/banner-1x.png')`
  };
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`

export default React.memo(Home)
