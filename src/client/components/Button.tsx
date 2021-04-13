import styled from '@emotion/styled'

interface Props {
  children: React.ReactNode
  onClick: () => void
}

const StyledButton = styled.div`
  padding: 2rem;

  background-color: var(--blue);
  border-radius: 4px;

  text-align: center;

  margin: 1rem 0 1rem 0;

  &:hover {
    cursor: pointer;
  }
`

export const Button = (props: Props): JSX.Element => {
  return <StyledButton {...props}>{props.children}</StyledButton>
}
