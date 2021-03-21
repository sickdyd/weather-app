import React from 'react'
import styled from '@emotion/styled'

const WindIcon = styled.i`
  font-size: 2rem;
  margin-right: 1rem;

  @media (min-width: 825px) {
    font-size: 3.5rem;
  }
`

export const WindInfo = ({ wind }: { wind: WindData }): JSX.Element => (
  <div>
    <WindIcon className={`wi wi-wind towards-${wind.deg}-deg`} />
    {wind.speed} kms/h
  </div>
)
