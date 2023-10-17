import React, { FC } from 'react';
import './SuccessScreen.css';
import { loginUser } from '../../../auth/authService';
import './SuccessScreen.css'

type Props = {
  text: string,
  login?: boolean
}

export const SuccessScreen: FC<Props> = ({ text, login }) => {
  return (
    <div className="success-container">
        <h1 className="success-title">{text}</h1>
        
        {login && <button className="button-style" onClick={loginUser}>
            Logga In
        </button>}
    </div>
  )
}
