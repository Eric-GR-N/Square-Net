import React, { FC } from 'react'
import { PageContainer } from '../layout/PageContainer'
import { SquareNetContainer } from '../SquareNetContainer'
import { Button } from '../layout/Button/Button'
import { PageContentContainer } from '../layout/PageContentContainer'

type Props = {}

export const Home: FC<Props> = () => {
  return (
    <PageContainer>
        <PageContentContainer>
            <Button text="Create New" style={{marginBottom: 10, alignSelf: 'flex-end'}}/>
            <SquareNetContainer />
        </PageContentContainer>
    </PageContainer>
  )
}