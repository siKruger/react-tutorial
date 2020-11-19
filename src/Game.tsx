import React, {useEffect, useState} from "react";
import {Board} from "./Board";
import './App.css';
import {fieldValue, oneStep} from "./Types";
import axios from 'axios';


export function Game(): React.ReactElement {
    let [board, setBoard] = useState([Array(9).fill(undefined)])
    let [nextPlayer, setNextPlayer] = useState(null);
    const reRender = false;


    //Nur EINMAL callen, alle 5 Sekunden
    useEffect(() => {
        const interval = setInterval(() => {
            console.log('Starting board Update...');
            compareServerBoardToClient();
        }, 5000);
    }, [reRender])



    const compareServerBoardToClient = async () => {
        const serverReponse = await getBoardFromServer();
        const serverSquares = await serverReponse.squares;
        const serverNextPlayer = await serverReponse.player;

        if (serverSquares[0] != board[0]) {
            const newBoard = [...board];
            newBoard[0] = serverSquares;
            setBoard(newBoard);
            setNextPlayer(serverNextPlayer)
        }
    }

    const getBoardFromServer =  async () => {
        const axs = await axios.get('http://localhost:3000/api/ticTac')
        return await axs.data.squares;
    }


    //Updaten des Klicks aufm Board
    const handleClick = (i: number) => {
        let newBoard = [...board]
        console.log(newBoard[0][i]);

        if(newBoard[0][i] == undefined) {
            newBoard[0][i] = nextPlayer;
        }
        console.log("CLICK", i);
        setBoard(newBoard);
    }


    //Todo calc winner, who is next?
    return (
        <div className="game">
            <div className="game-board">
                <Board squares={board[0]} onClick={(i: number) => handleClick(i)}>  </Board>
            </div>
            <div className="game-info">
                An der Reihe ist: {nextPlayer}
            </div>
        </div>
    );
}
