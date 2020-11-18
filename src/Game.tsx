import React, {useState} from "react";
import {Board} from "./Board";
import './App.css';
import {fieldValue, oneStep} from "./Types";



export function Game() {

    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setxIsNext] = useState(true);
    const [historyOuter, sethistoryOuter] = useState([{squares: Array(9).fill(undefined)}]);


    const handleClick = (i: number) => {
        const history = historyOuter.slice(0, stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';

        //New "States"
        sethistoryOuter(history.concat([{
            squares: squares
        }]))
        setxIsNext(!xIsNext);
        setStepNumber(history.length);

    }

    const calculateWinner = (squares: fieldValue[]) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    }

    const jumpTo = (step: number) => {
        setStepNumber(step)
        setxIsNext((step % 2) === 0)
    }




    //ab hier: eigentlich aufgerufen in der Render()
    const history = historyOuter;
    const current: oneStep = history[stepNumber];
    const winner = calculateWinner(current.squares);
    console.log("Current" , current);
    console.log("Squares-Current", current.squares);
    console.log("Game props type" ,typeof current.squares);

    const moves = history.map((step: oneStep, move: number) => {
        const desc = move ? 'Go to move #' + move : 'Go to game start';
        return (<li key={move}>
            <button onClick={() => jumpTo(move)}>{desc}</button>
        </li>);
    });

    let status;
    if (winner) {
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O');
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board squares={current.squares} onClick={(i: number) => handleClick(i)}/>
            </div>
            <div className="game-info">
                <div>{status}</div>
                <ol>{moves}</ol>
            </div>
        </div>
    );
}
