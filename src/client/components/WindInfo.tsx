import React from 'react'
import styled from '@emotion/styled'

const WindIcon = styled.i`
  font-size: 3rem;
  margin-right: 1rem;
`

export const WindInfo = ({ wind }: { wind: WindData }): JSX.Element => (
  <div>
    <WindIcon className={`wi wi-wind towards-${wind.deg}-deg`} />
    {wind.speed} kms/h
  </div>
)
