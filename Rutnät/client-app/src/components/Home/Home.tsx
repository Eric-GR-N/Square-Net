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
import { SquareNet } from '../../interfaces/Squares'

type Props = {}

export const Home: FC<Props> = () => {
  const [pageStatus, setPageStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [userSquareNets, setUserSquareNets] = useState<SquareNet[]>([]);
  const [selectedSquareNet, setSelectedSquareNet] = useState<SquareNet>();
  const [modalOpen, setModalopen] = useState<boolean>(false);

  useEffect(() => {
    setPageStatus(FetchStatus.Loading);
    apiFetch<SquareNet []>(`https://localhost:7162/api/SquareNet/getAllSquareNetsForUser`, undefined, HttpMethod.GET, false, 'application/json', true)
    .then((data) => {
        setUserSquareNets(data);
        setPageStatus(FetchStatus.Success);
    }).catch((err) => {
        console.log(err)
        setPageStatus(FetchStatus.Error);
    });
  }, []);

  console.log(selectedSquareNet)

  const handleSquareNetSubmit = (formdata: SquareNetFormData, type: SquareNetFormType) => {
    setModalopen(false);
    setPageStatus(FetchStatus.Loading);
    const isCreateType = type === SquareNetFormType.Create;
    const endpoint = `https://localhost:7162/api/SquareNet`;
    const body = isCreateType ? formdata.name : {...selectedSquareNet, name: formdata.name};
    const method = isCreateType ? HttpMethod.POST : HttpMethod.PUT;
  
    apiFetch<SquareNet>(endpoint, body, method, true, 'application/json', true)
      .then((result) => {
        isCreateType
        ? setUserSquareNets([...userSquareNets, result])
        : setUserSquareNets(prev => prev.map(squareNet => 
          squareNet.id === result.id ? result : squareNet
        ));
        setPageStatus(FetchStatus.Success)
      })
      .catch((err) => {
        console.log(err);
        setPageStatus(FetchStatus.Error);
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
            <SquareNetContainer squares={selectedSquareNet?.squares}/>
            <SaveSquareNetMenu onFinish={formData => handleSquareNetSubmit(formData, SquareNetFormType.Edit)}/>
            <SquareNetList squareNets={userSquareNets} setSelectedSquareNet={squareNet => setSelectedSquareNet(squareNet)}/>
        </PageContentContainer>
        <CreateSquareNetModal visible={modalOpen} onCancel={() => setModalopen(false)} onFinish={formData => handleSquareNetSubmit(formData, SquareNetFormType.Create)}/>
    </PageContainer>
  )
}