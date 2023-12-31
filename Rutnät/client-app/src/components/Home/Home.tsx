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
import userManager, { logoutUser } from '../../auth/authService'
import { SquareNetForm } from '../SquareNetForm'
import { message } from 'antd'
import LoadingScreen from '../layout/LoadingScreen/LoadingScreen'
import { API_BASE_URL } from '../../apiConfig'


type Props = {}

export const Home: FC<Props> = () => {
  const [pageStatus, setPageStatus] = useState<FetchStatus>(FetchStatus.Idle);
  const [userSquareNets, setUserSquareNets] = useState<SquareNet[]>([]);
  const [selectedSquareNet, setSelectedSquareNet] = useState<SquareNet>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [modalOpen, setModalopen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserAndSquareNets = async () => {
        setPageStatus(FetchStatus.Loading);

        try {
            const user = await userManager.getUser();

            if (!user || !user.profile.sub) {
                throw new Error('User not found');
            }

            const data = await apiFetch<SquareNet[]>(`${API_BASE_URL}/SquareNet/squareNets/${user.profile.sub}`, undefined, HttpMethod.GET, false, 'application/json', true);

            setUserSquareNets(data);
            setPageStatus(FetchStatus.Success);
        } catch (err) {
          setPageStatus(FetchStatus.Idle);
          message.error('Could not fetch SquareNets');
        }
    };

    fetchUserAndSquareNets();
}, []);

  const handleSquareNetSubmit = (formdata: SquareNetFormData, type: SquareNetFormType) => {
    setModalopen(false);
    setPageStatus(FetchStatus.Loading);
    const isCreateType = type === SquareNetFormType.Create;
    const endpoint = `${API_BASE_URL}/SquareNet`;
    const body = isCreateType ? formdata.name : {...selectedSquareNet, name: formdata.name ?? selectedSquareNet?.name};
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
          setSelectedSquareNet(result);
        }
        setPageStatus(FetchStatus.Success)
      })
      .catch(() => {
        setPageStatus(FetchStatus.Idle);
        message.error('Could not save SquareNet');
      }).finally(() => setEditMode(false));
  };

  const handleDelete = (id: string) => {
    setPageStatus(FetchStatus.Loading);
    apiFetch(`${API_BASE_URL}/SquareNet/${id}`, undefined, HttpMethod.DELETE, false, 'application/json', true)
    .then(() => {
      setUserSquareNets(prev => prev.filter(squareNet => squareNet.id !== id));
      setSelectedSquareNet(undefined);
      setPageStatus(FetchStatus.Success)
    })
    .catch(() => {
      setPageStatus(FetchStatus.Idle);
      message.error('Could not delete SquareNet');
    }).finally(() => setEditMode(false));
  };
  
  if (pageStatus === FetchStatus.Loading) {
    return <PageContainer><LoadingScreen /></PageContainer>;
}

if (pageStatus === FetchStatus.Success || pageStatus === FetchStatus.Idle) {
    return (
        <PageContainer>
            <PageContentContainer style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}>
              <div style={{ margin: '30px 0px', alignSelf: 'flex-end' }}>
                <Button text="Sign out" onClick={logoutUser} />
                <Button text="Create New" style={{ marginLeft: 10 }} onClick={() => {
                    setSelectedSquareNet(undefined);
                    setModalopen(true);
                }
                } />
              </div>
                <SquareNetContainer
                  squares={selectedSquareNet?.squares}
                  onSquareClick={updatedSquare => selectedSquareNet?.squares && setSelectedSquareNet({
                          ...selectedSquareNet,
                          squares: selectedSquareNet?.squares.map(square => square.id === updatedSquare.id ? updatedSquare : square)
                  })}
                  editable={editMode}
                />
                <SquareNetForm onFinish={formData => handleSquareNetSubmit(formData, SquareNetFormType.Edit)} visible={editMode}/>
                <SquareNetList
                    squareNets={userSquareNets}
                    setSelectedSquareNet={squareNet => setSelectedSquareNet(squareNet)}
                    selectedSquareNetId={selectedSquareNet?.id}
                    onDelete={handleDelete}
                    editActivated={isActive => setEditMode(isActive)}
                />
            </PageContentContainer>
            <CreateSquareNetModal visible={modalOpen} onCancel={() => setModalopen(false)} onFinish={formData => handleSquareNetSubmit(formData, SquareNetFormType.Create)} />
        </PageContainer>
    );
}
return null;
}