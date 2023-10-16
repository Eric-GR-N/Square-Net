import React, { FC, useEffect, useState } from 'react'
import { PageContainer } from '../layout/PageContainer'
import { SquareNetContainer } from '../SquareNetContainer'
import { Button } from '../layout/Button/Button'
import { PageContentContainer } from '../layout/PageContentContainer'
import { SquareNetList } from '../SquareNetList'
import { SaveSquareNetMenu } from '../SaveSquareNetMenu'
import { FetchStatus, HttpMethod } from '../../enums'
import { apiFetch } from '../../integration'

type Props = {}

export const Home: FC<Props> = () => {
  const [uploadStatus, setUploadStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [userSquareNets, setUserSquareNets] = useState<any[]>([]);

  useEffect(() => {
    setUploadStatus(FetchStatus.Loading);
    apiFetch<any []>(`https://localhost:7162/api/SquareNet/getAllSquareNetsForUser`, undefined, HttpMethod.GET, false, 'application/json', true)
    .then((data) => {
        setUserSquareNets(data);
        setUploadStatus(FetchStatus.Success);
    }).catch((err) => {
        console.log(err)
        setUploadStatus(FetchStatus.Error);
    });
  }, []);

  const handleCreateNewSquareNet = () => {
    setUploadStatus(FetchStatus.Loading);
    apiFetch(`https://localhost:7162/api/SquareNet`, undefined, HttpMethod.POST, true, 'application/json', true)
    .then(() => {
        setUploadStatus(FetchStatus.Success);
    }).catch((err) => {
        console.log(err)
        setUploadStatus(FetchStatus.Error);
    });
}

  return (
    <PageContainer>
        <PageContentContainer style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
          }}>
            <Button text="Create New" style={{margin: '30px 0px', alignSelf: 'flex-end'}} onClick={handleCreateNewSquareNet}/>
            <SquareNetContainer />
            <SaveSquareNetMenu />
            <SquareNetList squareNets={[1,1,1,1,1,1,1,1,1,1]} />
        </PageContentContainer>
    </PageContainer>
  )
}