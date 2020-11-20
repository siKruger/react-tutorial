import React, {useEffect, useState} from "react";
import {Board} from "./Board";
import './App.css';
import {fieldValue, oneStep} from "./Types";
import axios from 'axios';


export function Game(): React.ReactElement {
    let [board, setBoard] = useState([Array(9).fill(undefined)])
    let [nextPlayer, setNextPlayer] = useState(undefined);
    let [winner, setWinner] = useState(undefined)
    let [didUseMove, setdidUseMove] = useState(false)

    const reRender = false;


    //Nur EINMAL callen, alle 5 Sekunden
    useEffect(() => {
        const interval = setInterval(() => {
            compareServerBoardToClient();
        }, 1000);
    }, [reRender])


    const compareServerBoardToClient = async () => {
        const serverReponse = await getBoardFromServer();
        const serverSquares = await serverReponse.squares;
        const serverNextPlayer = await serverReponse.player;
        const serverWinner = await serverReponse.winner;

        if (serverSquares[0] != board[0]) {
            setdidUseMove(false);
            const newBoard = [...board];
            newBoard[0] = serverSquares;
            setBoard(newBoard);
            setNextPlayer(serverNextPlayer)
            setWinner(serverWinner)
        }
    }


    const getBoardFromServer =  async () => {
        const axs = await axios.get('/api/ticTac')
        return await axs.data.squares;
    }


    //Updaten des Klicks aufm Board
    const handleClick = async (i: number) => {

        let newBoard = [...board]
        if (newBoard[0][i] == undefined && !didUseMove) {
            setdidUseMove(true)
            newBoard[0][i] = nextPlayer;
            setBoard(newBoard);


            const sendToServer = newBoard[0];
            await sendNewDataToServer(sendToServer);


        }
    }

    const sendNewDataToServer = async (sendToServer: any) => {
        const axs = await axios.post('/api/ticTac', {
            "board": sendToServer,
            "player": nextPlayer
        })
        await console.log(axs);
    }


    //Todo calc winner, who is next?

    const renderFieldOrWinner = () => {
        if(winner == undefined) {
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
        } else {
            return(
                <div>
                    {winner} hat gewonnen!!
                    <p></p>
                    <button onClick={startNewGame}> Erneut spielen </button>
                </div>
            );
        }
    }


    const startNewGame = () => {
        const axs = axios.delete('/api/ticTac')
    }

    return (
        <div> {renderFieldOrWinner()} </div>
    );
}
