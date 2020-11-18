import React from "react";
import {Square} from "./Square";
import {boardProps} from "./Types";



export function Board(props: boardProps) {


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
