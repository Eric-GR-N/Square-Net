import { FC } from "react";
import "./SquareComponent.css";
import { SquareColor } from "../../enums/squares";
import { colorPalette } from "../../styles/colorPalette";
import { colorTransformer } from "../../utilities";

type Props = {
    color: SquareColor,
    onClick: () => void,
};

export const SquareComponent: FC<Props> = ({
    color,
    onClick = () => {},
}) => {
    return <div className="square" style={{backgroundColor: colorTransformer(color)}} onClick={onClick}></div>;
};