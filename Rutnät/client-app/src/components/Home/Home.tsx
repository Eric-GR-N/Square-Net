import React, { FC, useEffect, useState } from 'react'
import { PageContainer } from '../layout/PageContainer'
import { SquareNetContainer } from '../SquareNetContainer'
import { Button } from '../layout/Button/Button'
import { PageContentContainer } from '../layout/PageContentContainer'
import { SquareNetList } from '../SquareNetList'
import { SaveSquareNetMenu } from '../SaveSquareNetMenu'
import { FetchStatus, HttpMethod } from '../../enums'
import { apiFetch } from '../../integration'
import { CreateSquareNetModal } from '../CreateSquareNetModal/CreateSquareNetModal'
import { SquareNetFormType } from '../../enums/forms'
import { SquareNetFormData } from '../../interfaces/forms'

type Props = {}

export const Home: FC<Props> = () => {
  const [uploadStatus, setUploadStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [userSquareNets, setUserSquareNets] = useState<any[]>([]);
  const [modalOpen, setModalopen] = useState<boolean>(false);

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

  const handleSquareNetSubmit = (formdata: SquareNetFormData, type: SquareNetFormType) => {
    setUploadStatus(FetchStatus.Loading);

    const isCreateType = type === SquareNetFormType.Create;
    const endpoint = `https://localhost:7162/api/SquareNet`;
    const body = isCreateType ? formdata.name : {};
    const method = isCreateType ? HttpMethod.POST : HttpMethod.PUT;
  
    apiFetch(endpoint, body, method, true, 'application/json', true)
      .then(() => setUploadStatus(FetchStatus.Success))
      .catch((err) => {
        console.log(err);
        setUploadStatus(FetchStatus.Error);
      });
  };
  
  return (
    <PageContainer>
        <PageContentContainer style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
          }}>
            <Button text="Create New" style={{margin: '30px 0px', alignSelf: 'flex-end'}} onClick={() => setModalopen(true)}/>
            <SquareNetContainer />
            <SaveSquareNetMenu onFinish={formData => handleSquareNetSubmit(formData, SquareNetFormType.Edit)}/>
            <SquareNetList squareNets={userSquareNets} />
        </PageContentContainer>
        <CreateSquareNetModal visible={modalOpen} onCancel={() => setModalopen(false)} onFinish={formData => handleSquareNetSubmit(formData, SquareNetFormType.Create)}/>
    </PageContainer>
  )
}