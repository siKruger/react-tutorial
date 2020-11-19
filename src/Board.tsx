import React, {PropsWithChildren, ReactNode} from "react";
import {Square} from "./Square";
import {boardProps} from "./Types";


/*const Board2: React.FC<boardProps> = (props, context) => {
    return {};
};*/

export function Board(props: PropsWithChildren<boardProps>): React.ReactElement {

    const renderSquare = (i: number) => {
        console.log("Board Props" ,props);
        return (
            <Square value={props.squares[i]} onClick={() => props.onClick(i)}/>
        );
    }

    return (
        <div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}
