import React, { FC } from 'react'
import { PageContainer } from '../layout/PageContainer'
import { SquareNetContainer } from '../SquareNetContainer'
import { Button } from '../layout/Button/Button'
import { PageContentContainer } from '../layout/PageContentContainer'
import SquareNetList from '../SquareNetList/SquareNetList'

type Props = {}

export const Home: FC<Props> = () => {
  return (
    <PageContainer>
        <PageContentContainer>
            <Button text="Create New" style={{marginBottom: 10, alignSelf: 'flex-end'}}/>
            <SquareNetContainer />
            <SquareNetList squareNets={[1,2,3]} />
        </PageContentContainer>
    </PageContainer>
  )
}