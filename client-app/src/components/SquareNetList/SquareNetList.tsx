import React, { FC } from 'react'
import { SquareNetListItem } from '../SquareNetListItem';

type Props = {
    squareNets: any[];
}

const SquareNetList:FC<Props> = ({
    squareNets = [],
}) => {
  return (
    <div style={{
        width: '100%',
        height: '30%',
        border: '1px solid yellow',
        overflow: 'auto',
    }}>
        {
            squareNets.map((squareNet, idx) => { return <SquareNetListItem key={idx} /> })
        }
    </div>
  )
}

export default SquareNetList