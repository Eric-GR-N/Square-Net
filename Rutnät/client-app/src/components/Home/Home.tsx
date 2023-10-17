import React, { FC, useEffect, useState } from 'react'
import { PageContainer } from '../layout/PageContainer'
import { SquareNetContainer } from '../SquareNetContainer'
import { Button } from '../layout/Button/Button'
import { PageContentContainer } from '../layout/PageContentContainer'
import { SquareNetList } from '../SquareNetList'
import { FetchStatus, HttpMethod } from '../../enums'
import { apiFetch } from '../../integration'
import { CreateSquareNetModal } from '../CreateSquareNetModal/CreateSquareNetModal'
import { SquareNetFormType } from '../../enums/forms'
import { SquareNetFormData } from '../../interfaces/forms'
import { SquareNet } from '../../interfaces/Squares'
import userManager from '../../auth/authService'
import { SquareNetForm } from '../SaveSquareNetMenu'

type Props = {}

export const Home: FC<Props> = () => {
  const [pageStatus, setPageStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [userSquareNets, setUserSquareNets] = useState<SquareNet[]>([]);
  const [selectedSquareNet, setSelectedSquareNet] = useState<SquareNet>();
  const [modalOpen, setModalopen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserAndSquareNets = async () => {
        setPageStatus(FetchStatus.Loading);

        try {
            const user = await userManager.getUser();

            if (!user || !user.profile.sub) {
                throw new Error('User not found');
            }

            const data = await apiFetch<SquareNet[]>(`https://localhost:7162/api/SquareNet/squareNets/${user.profile.sub}`, undefined, HttpMethod.GET, false, 'application/json', true);

            setUserSquareNets(data);
            setPageStatus(FetchStatus.Success);
        } catch (err) {
            console.log(err);
            setPageStatus(FetchStatus.Error);
        }
    };

    fetchUserAndSquareNets();
}, []);

  const handleSquareNetSubmit = (formdata: SquareNetFormData, type: SquareNetFormType) => {
    setModalopen(false);
    setPageStatus(FetchStatus.Loading);
    const isCreateType = type === SquareNetFormType.Create;
    const endpoint = `https://localhost:7162/api/SquareNet`;
    const body = isCreateType ? formdata.name : {...selectedSquareNet, name: formdata.name};
    const method = isCreateType ? HttpMethod.POST : HttpMethod.PUT;
  
    apiFetch<SquareNet>(endpoint, body, method, true, 'application/json', true)
      .then((result) => {

        if(isCreateType){
          setUserSquareNets([...userSquareNets, result])
          setSelectedSquareNet(result);
        } else {
          setUserSquareNets(prev => prev.map(squareNet => 
            squareNet.id === result.id ? result : squareNet
          ));
        }
        setPageStatus(FetchStatus.Success)
      })
      .catch((err) => {
        console.log(err);
        setPageStatus(FetchStatus.Error);
      });
  };

  const handleDelete = (id: string) => {
    apiFetch(`https://localhost:7162/api/SquareNet/${id}`, undefined, HttpMethod.DELETE, false, 'application/json', true)
    .then(() => {
      setUserSquareNets(prev => prev.filter(squareNet => squareNet.id !== id));
      setSelectedSquareNet(undefined);
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
            <Button text="Create New" style={{margin: '30px 0px', alignSelf: 'flex-end'}} onClick={() => {
              setSelectedSquareNet(undefined);
              setModalopen(true);
            }
              }/>
            <SquareNetContainer squares={selectedSquareNet?.squares}
            onSquareClick={updatedSquare => selectedSquareNet?.squares &&  setSelectedSquareNet({...selectedSquareNet,
              squares: selectedSquareNet?.squares.map(square => square.id === updatedSquare.id ? updatedSquare : square)})}
            />
            {(userSquareNets.length > 0 && selectedSquareNet) && <SquareNetForm onFinish={formData => handleSquareNetSubmit(formData, SquareNetFormType.Edit)} selectedSquareNet={selectedSquareNet}/>}
            <SquareNetList
            squareNets={userSquareNets}
            setSelectedSquareNet={squareNet => setSelectedSquareNet(squareNet)}
            selectedSquareNetId={selectedSquareNet?.id}
            onDelete={handleDelete}
            />
        </PageContentContainer>
        <CreateSquareNetModal visible={modalOpen} onCancel={() => setModalopen(false)} onFinish={formData => handleSquareNetSubmit(formData, SquareNetFormType.Create)}/>
    </PageContainer>
  )
}