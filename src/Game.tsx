import React, {useEffect, useState} from "react";
import {Board} from "./Board";
import './App.css';
import {fieldValue, oneStep} from "./Types";
import axios from 'axios';


export function Game(): React.ReactElement {
    let [board, setBoard] = useState([Array(9).fill(undefined)])
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
        if (serverReponse[0] != board[0]) {
            console.log("neues Board auf dem Server gefunden")
            const newBoard = [...board];
            newBoard[0] = serverReponse;


            setBoard(newBoard);
        }
    }

    const getBoardFromServer =  async () => {
        console.log("fetching new Board fom Server");
        const axs = await axios.get('http://localhost:3000/api/ticTac')
        return await axs.data.squares;
    }




    //Todo calc winner, who is next?
    return (
        <div className="game">
            <div className="game-board">
                <Board squares={board[0]} >  </Board>
            </div>
        </div>
    );
}
