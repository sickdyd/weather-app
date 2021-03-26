import React from 'react'
import styled from '@emotion/styled'

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 140px;
  width: 140px;

  font-size: 3rem;

  border: 2px dashed #1398b2;
  border-radius: 50%;

  @keyframes loading {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(180deg);
    }
  }

  animation-name: loading;
  animation-duration: 2s;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`

export const Loader = (): JSX.Element => <StyledLoader />
