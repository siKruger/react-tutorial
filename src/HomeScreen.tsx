import React, {useState} from "react";
import axios from "axios";
import {Game} from "./Game";

export default function HomeScreen() {

    let [joined, setJoined] = useState(false)
    let [inputFieldSession, setInputFieldSession] = useState("")
    let [validateField, setValidateField] = useState(true)

    let [sessionId, setSessionId] = useState("")
    let [sessionName, setSessionName] = useState("")
    let [me, setMe] = useState("")
    let [player, setPlayer] = useState("")

    const joinExistingSession = async () => {
        const putUrl = '/api/gameSessions/' + inputFieldSession

        const axs = await axios.put(putUrl, {}, {params: {test: Math.floor(Math.random() * 10000)}})
            .catch()


        //todo fehlermeldung wenn es die session nicht gibt

        setSessionId(axs.data.id);
        setSessionName(axs.data.name);
        setMe(axs.data.you)
        setPlayer(axs.data.youAre)



        setJoined(true)
    }





    const handleChange = (event: any) => {
        setInputFieldSession(event.target.value)
        if(event.target.value === 0) {
            setValidateField(true)
        } else {
            setValidateField(false)
        }
    }



    const NewSessionRequest = async () => {
        const axs = await axios.post('/api/gameSessions', {
            sessionName: "test"
        }, {params: {test: Math.floor(Math.random() * 10000)}})



        const createdId = await axs.data.id
        const putUrl = '/api/gameSessions/' + createdId
        const axs2 = await axios.put(putUrl, {}, {params: {test: Math.floor(Math.random() * 10000)}})
            .catch()





        setSessionId(axs2.data.id);
        setSessionName(axs2.data.name);
        setMe(axs2.data.you)
        setPlayer(axs2.data.youAre)

        setJoined(true)
    }


    if (!joined) {
        return (<div>
                <h2> Willkommen bei TicTacToe! </h2>
                <button onClick={NewSessionRequest}> Neue Session</button>
                <p></p>
                <input value={inputFieldSession} placeholder={"Session ID"} onChange={handleChange} type="text"/>
                <button disabled={validateField} onClick={joinExistingSession}> Beitreten</button>
            </div>
        );
    } else {
        return (<Game player={player} name={sessionName} id={sessionId} me={me} />)
    }


}
