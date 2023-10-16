import React, { FC } from 'react';
import { Button } from '../layout/Button';
import { Typography } from 'antd';

const { Text } = Typography;

type Props = {
    text: string;
    onClick: () => void;
}
export const SquareNetListItem: FC<Props> = ({
    text,
    onClick = () => {},
}) => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between', 
            alignItems: 'center',
            height: '20%',
            padding: '0px 10px',
            borderBottom: '2px solid grey',
            cursor: 'pointer',
        }} onClick={onClick}>
            <Text style={{ textAlign: 'start' }}>{text}</Text>
            <div style={{ display: 'flex' }}>
                <Button text="Edit"/>
                <Button text="Delete" style={{ margin: '0px 10px' }}/>
            </div>
        </div>
    );
}