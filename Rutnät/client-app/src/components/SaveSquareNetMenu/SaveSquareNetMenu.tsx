import React, { FC } from 'react'
import { SquareNetListItem } from '../SquareNetListItem';
import { Button } from '../layout/Button';
import { Divider } from 'antd';

type Props = {
}

export const SaveSquareNetMenu:FC<Props> = ({}) => {
  return (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100px',
        margin: '30px 0px',
    }}>
        <form style={{display: 'flex', justifyContent: 'center', width: '100%', flexWrap: 'nowrap'}}>
            <input 
                type="text" 
                placeholder="Name" 
                style={{
                    width: '80%',
                    height: '35px',
                    boxSizing: 'border-box',
                    border: '2px solid grey',
                    borderRadius: '5px',
                    padding: '10px',
                    flexShrink: 1,
                    marginRight: '10px'
                }}
            />
            <Button type="submit" text="Save" style={{
                    flexShrink: 1,
                    minWidth: '50px'
                }} />
        </form>
    </div>
  )
}
