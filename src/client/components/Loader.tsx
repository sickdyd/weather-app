import styled from '@emotion/styled'

const StyledLoader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 140px;
  width: 140px;

  font-size: 3rem;

  border: 2px dashed #5a7eff;
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

const SunIcon = styled.i`
  color: #5a7eff;
  font-size: 3rem;

  @keyframes sunLoading {
    from {
      transform: scale(1, 1);
    }
    to {
      transform: scale(2, 2);
    }
  }

  animation-name: sunLoading;
  animation-duration: 2s;
  animation-direction: alternate-reverse;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
`

export const Loader = (): JSX.Element => (
  <StyledLoader>
    <SunIcon className="wi wi-day-sunny" />
  </StyledLoader>
)
