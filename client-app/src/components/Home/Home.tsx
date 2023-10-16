import React, { FC } from 'react'
import { PageContainer } from '../layout/PageContainer'
import { SquareNetContainer } from '../SquareNetContainer'

type Props = {}

export const Home: FC<Props> = () => {
  return (
    <PageContainer>
        <SquareNetContainer />
    </PageContainer>
  )
}