import React, { FC } from 'react'
import './SquareNetContainer.css'
import { SquareComponent } from '../Square/SquareComponent';
import { Square } from '../../interfaces';
import { colorIncrementer } from '../../utilities';

type Props = {
    squares?: Square[];
    onSquareClick: (square: Square) => void;
    editable: boolean;
}

export const SquareNetContainer: FC<Props> = ({
    squares = [],
    onSquareClick = () => {},
    editable = false,
}) => {
    return (
        <div className="squareNetContainer" style={{pointerEvents: editable ? 'auto' : 'none'}}>
            {squares.length > 0 && squares.map((square, idx) => (
                <SquareComponent key={idx} color={square.color} onClick={() => onSquareClick({...square, color: colorIncrementer(square.color)})}/>
            ))}
        </div>
    );
};