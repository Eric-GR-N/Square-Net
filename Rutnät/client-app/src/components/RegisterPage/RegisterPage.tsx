import React, { useState, useEffect } from 'react';
import { colorPalette } from '../../styles/colorPalette';
import { PageContainer } from '../layout/PageContainer';
import { FetchStatus, HttpMethod } from '../../enums';
import { apiFetch } from '../../integration/apifetch';
import LoadingScreen from '../layout/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../layout/ErrorScreen';
import { SuccessScreen } from '../layout/SuccessScreen';

export const buttonStyle: React.CSSProperties = {
  display: 'inline-block',
  padding: '10px 30px',
  cursor: 'pointer',
  backgroundColor: colorPalette.red,
  color: '#fff',
  borderRadius: '25px',
  border: 'none',
  outline: 'none',
  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
  transition: 'background-color 0.2s ease',
  fontFamily: 'Dancing Script, cursive',
  fontSize: 25,
  marginTop: 40
};

export const RegisterPage: React.FC = () => {
const [uploadStatus, setUploadStatus] = useState<FetchStatus>(FetchStatus.Idle);
let content;
const [username, setUsername] = useState<string>('');
const [password, setPassword] = useState<string>('');
const [confirmPassword, setConfirmPassword] = useState<string>('');

const inputStyle: React.CSSProperties = {
    display: 'inline-block',
    fontSize: 20,
    width: '100%',
    marginTop: 20,
    borderRadius: '25px',
    border: 'none',
    outline: 'none',
    textAlign: 'center',
    fontFamily: 'Dancing Script, cursive',
    padding: 5,
};

const inputTextStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '10px 30px',
    cursor: 'pointer',
    color: '#fff',
    fontFamily: 'Dancing Script, cursive',
    fontSize: 30,
    maxWidth: 'fit-content',
    marginTop: 20,
    letterSpacing: '0.05em', 
    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
};

const handleRegister = () => {
    setUploadStatus(FetchStatus.Loading);
    apiFetch(`https://localhost:7162/api/Account/Register`, {
        username: username,
        password: password,
        confirmPassword: password
    }, HttpMethod.POST, true, 'application/json', false).then(() => {
        setUploadStatus(FetchStatus.Success);
    }).catch((err) => {
        console.log(err)
        setUploadStatus(FetchStatus.Error);
    });
}

switch (uploadStatus) {
    case FetchStatus.Loading:
      content = <LoadingScreen />;
      break;
    case FetchStatus.Error:
      content = <ErrorScreen />;
      break;
    case FetchStatus.Success:
      content = <SuccessScreen text="Klart" login= {true}/>;
      break;
    default:
      content = <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '30%',
        width: '60%'
        }}>
    <form>
        <input style={inputStyle} type="text" placeholder="Användarnamn" value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input style={inputStyle} type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <input style={inputStyle} type="password" placeholder="Bekräfta Lösenord" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
    </form>
    <button style={buttonStyle} onClick={handleRegister}>
        Registrera
    </button>
  </div>;
}

  return (
    <PageContainer>
        {content}
    </PageContainer>
  );
};
