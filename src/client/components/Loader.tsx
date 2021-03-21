import React from 'react'
import styled from '@emotion/styled'

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100vh;
  width: 100%;

  font-size: 3rem;

  @keyframes loading {
    from {
      background-color: #004650;
    }
    to {
      background-color: #3b788d;
    }
  }

  animation-name: loading;
  animation-duration: 1s;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
`

export const Loader = (): JSX.Element => <StyledLoader>Loading data...</StyledLoader>
