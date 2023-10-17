import { SquareColor } from "./enums/squares";
import { colorPalette } from "./styles/colorPalette";

export const colorTransformer = (color: SquareColor, increment?: boolean) => {

    if(increment){
        color === SquareColor.Red
        ? color = SquareColor.Grey
        : color = color + 1;
    }

    switch(color){
        case SquareColor.Red:
            return colorPalette.red;
        case SquareColor.Green:
            return colorPalette.green;
        case SquareColor.Orange:
            return colorPalette.orange;
        default:
            return colorPalette.grey;
    }
};

export const colorIncrementer = (color: SquareColor) => {
       
    if(color === SquareColor.Red){
        return SquareColor.Grey;
    }
    
    return color + 1;
};