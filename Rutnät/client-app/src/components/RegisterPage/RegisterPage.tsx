import React, { useState } from 'react';
import { PageContainer } from '../layout/PageContainer';
import { FetchStatus, HttpMethod } from '../../enums';
import { apiFetch } from '../../integration/apifetch';
import LoadingScreen from '../layout/LoadingScreen/LoadingScreen';
import { ErrorScreen } from '../layout/ErrorScreen';
import { SuccessScreen } from '../layout/SuccessScreen';
import './RegisterPage.css';

export const RegisterPage: React.FC = () => {
    const [uploadStatus, setUploadStatus] = useState<FetchStatus>(FetchStatus.Idle);
    let content;
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const handleRegister = () => {
        setUploadStatus(FetchStatus.Loading);
        apiFetch(`https://localhost:7162/api/Account/Register`, {
            username: username,
            password: password,
            confirmPassword: password
        }, HttpMethod.POST, true, 'application/json', false).then(() => {
            setUploadStatus(FetchStatus.Success);
        }).catch(() => {
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
            content = <SuccessScreen text="Done!" login={true} />;
            break;
        default:
            content = (
                <div className="register-form-container">
                    <form className="register-form">
                        <input className="register-input" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <input className="register-input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <input className="register-input" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    </form>
                    <button className="btn-primary" onClick={handleRegister}>
                        Register
                    </button>
                </div>
            );
    }

    return (
        <PageContainer>
            {content}
        </PageContainer>
    );
};
