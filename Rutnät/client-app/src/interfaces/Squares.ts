import { SquareColor } from "../enums/squares";

export interface Square {
    id: string;
    color: SquareColor;
}

export interface SquareNet {
    id: string;
    name: string;
    squares: Square[];
    applicationUserId?: string | null;
}