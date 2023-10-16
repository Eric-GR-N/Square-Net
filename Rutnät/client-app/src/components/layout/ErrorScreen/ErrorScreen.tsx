import React, { FC } from 'react'
import {PiSmileySad} from 'react-icons/pi'
import { colorPalette } from '../../../styling/colorPalette'

type Props = {}

export const ErrorScreen: FC<Props> = ({}) => {
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
        }}>Nånting gick fel</h1>
        <PiSmileySad style={{color: 'white'}} size={100}/>
        </div>
  )}