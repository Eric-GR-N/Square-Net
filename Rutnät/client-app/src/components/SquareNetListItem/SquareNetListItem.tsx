import React, { FC } from 'react';
import { Button } from '../layout/Button';
import { Typography } from 'antd';

const { Text } = Typography;

type Props = {
}
export const SquareNetListItem: FC<Props> = ({}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',  // Distributes items on both ends
            alignItems: 'center',
            height: '20%',
            padding: '0px 10px',
            borderBottom: '1px solid grey'
        }}>
            <Text style={{ textAlign: 'start' }}>Mitt Rutnät</Text>
            <div style={{ display: 'flex' }}>
                <Button text="Edit"/>
                <Button text="Delete" style={{ margin: '0px 10px' }}/>
            </div>
        </div>
    );
}