import React, { FC } from 'react'
import './SquareNetContainer.css'
import { Square } from '../Square/Square';

type Props = {}

export const SquareNetContainer: FC<Props> = () => {
    return (
        <div className="squareNetContainer">
            {Array.from({ length: 25 }).map((_, idx) => (
                <Square key={idx} />
            ))}
        </div>
    );
};