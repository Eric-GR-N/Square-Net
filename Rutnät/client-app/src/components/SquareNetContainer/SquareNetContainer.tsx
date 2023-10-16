import React, { FC } from 'react'
import './SquareNetContainer.css'
import { SquareComponent } from '../Square/SquareComponent';
import { Square } from '../../interfaces';

type Props = {
    squares?: Square[];
}

export const SquareNetContainer: FC<Props> = ({
    squares = [],
}) => {
    return (
        <div className="squareNetContainer">
            {squares.length > 0 && squares.map((_, idx) => (
                <SquareComponent key={idx} />
            ))}
        </div>
    );
};