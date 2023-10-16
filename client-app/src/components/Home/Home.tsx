import React, { FC } from 'react'
import { PageContainer } from '../layout/PageContainer'
import { SquareNetContainer } from '../SquareNetContainer'
import { Button } from '../layout/Button/Button'
import { PageContentContainer } from '../layout/PageContentContainer'
import { SquareNetList } from '../SquareNetList'
import { SaveSquareNetMenu } from '../SaveSquareNetMenu'

type Props = {}

export const Home: FC<Props> = () => {
  return (
    <PageContainer>
        <PageContentContainer>
            <Button text="Create New" style={{marginBottom: 10, alignSelf: 'flex-end'}}/>
            <SquareNetContainer />
            <SaveSquareNetMenu />
            <SquareNetList squareNets={[1,2,3,4,5,6,7,8]} />
        </PageContentContainer>
    </PageContainer>
  )
}