export type oneBoard = {squares: square};
export type square = fieldValue;
export type fieldValue = "X" | "O" | undefined;
export type historyBoard = oneStep[];
export type oneStep = {squares: fieldValue[]};


export type squareProps = {
    value: fieldValue;
    onClick: () => void;
}



export type boardProps = {
    squares: fieldValue[] ;
    onClick: (i: number) => void;
}
