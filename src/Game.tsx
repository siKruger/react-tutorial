import React, {useEffect, useState} from "react";
import {Board} from "./Board";
import './App.css';
import {fieldValue, oneStep} from "./Types";
import axios from 'axios';


export function Game(props: any): React.ReactElement {
    let [board, setBoard] = useState([Array(9).fill(undefined)])
    let [nextPlayer, setNextPlayer] = useState(undefined);
    let [winner, setWinner] = useState(undefined)
    let [didUseMove, setdidUseMove] = useState(false)



    //Nur EINMAL callen, alle 5 Sekunden
    useEffect(() => {
        const interval = setInterval(() => {
            compareServerBoardToClient().catch((reason) => {console.error(reason)});
        }, 1000);
    }, [])


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
        //const axs = await axios.get('/api/ticTac', {validateStatus: (code) => {return code === 200}, params: {test: Math.floor(Math.random() * 10000)}})

        const axs = await axios.post('/api/ticTac', {
            id: props.id,
        })
        return axs.data.squares;
    }


    //Updaten des Klicks aufm Board
    const handleClick = async (i: number) => {

        if(!(props.player === nextPlayer)) {
           return
        }

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
        const axs = await axios.put('/api/ticTac', {
            "board": sendToServer,
            id: props.id,
            myPlayer: props.me
        })
    }


    //Todo calc winner, who is next?

    const renderFieldOrWinner = () => {
        if(winner == undefined) {
            return (
                <div>
                    <h1> Board: {props.name} </h1>
                <div className="game">
                    <div className="game-board">
                        <Board squares={board[0]} onClick={(i: number) => handleClick(i)}>  </Board>
                    </div>
                    <div className="game-info">
                        Du bist: {props.player}
                        <p></p>
                        An der Reihe ist: {nextPlayer}
                    </div>
                </div>
                    <br />
                    <hr />
                    Session ID: {props.id}
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
        const axs = axios.delete('/api/ticTac', {
            data: {
                id: props.id
            }
        })
    }

    return (
        <div> {renderFieldOrWinner()} </div>
    );
}
