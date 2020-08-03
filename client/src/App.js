import React, {useState, useEffect} from "react";
import socketIOClient from "socket.io-client";

const ENDPOINT = "http://localhost:9092";
const socket = socketIOClient(ENDPOINT);

function App() {
    const [response, setResponse] = useState([]);
    const [newMessage, setNewMessage] = useState([]);

    useEffect(() => {
        socket.on("message", data => {
            setResponse(data);
        });
    }, []);

    function handleButtonClick() {
        socket.emit("message", newMessage);
    }

    return (
        <p>
            {response}
            <br/>
            <input type="text" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
            <br/>
            <button onClick={() => handleButtonClick()}>
                Wyślij wiadomość
            </button>
        </p>
    );
}

export default App;