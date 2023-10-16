import React, { FC } from 'react'
import { SquareNetListItem } from '../SquareNetListItem';
import { Divider } from 'antd';

type Props = {
    squareNets: any[];
}

export const SquareNetList:FC<Props> = ({
    squareNets = [],
}) => {
  return (
    <div style={{
        width: '100%',
        height: '30%',
        overflow: 'auto',
    }}>
        <Divider orientation="center" style={{borderTopColor: 'black'}}>Saved Square Nets</Divider>
        {
            squareNets.map((squareNet, idx) => {
                return (
                    <SquareNetListItem key={idx} text={squareNet?.name}/>
            )})
        }
    </div>
  )
}