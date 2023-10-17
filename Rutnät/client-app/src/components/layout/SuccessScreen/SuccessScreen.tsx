import React, { FC } from 'react'
import { colorPalette } from '../../../styles/colorPalette'
import { loginUser } from '../../../auth/authService'

type Props = {
  text: string,
  login?: boolean
}

export const SuccessScreen: FC<Props> = ({text, login}) => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'}}
        >
        <h1 style={{
            color: colorPalette.white, 
            fontFamily: 'Dancing Script, cursive',
            fontSize: '42px', 
            letterSpacing: '0.05em', 
            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)', 
            textAlign: 'center',
            padding: '10px',
            borderRadius: '5px',
        }}>{text}</h1>
        
        {/* {login && <button style={buttonStyle} onClick={loginUser}>
            Logga In
        </button>} */}
        </div>
  )}