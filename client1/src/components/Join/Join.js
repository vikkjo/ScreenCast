import React, { useState } from 'react';
import { Link } from "react-router-dom";


import './Join2.css'


export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const generateID = () => {
    return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const generateRoomString = () => {
    let input = document.getElementById("roomField")
    let generatedString = generateID();
    input.value = generatedString;
    setRoom(generatedString);
  }


  return (
  <div>
    <div>
        <h1 className="heading">Screen Sharing App</h1>
        <p>Choose a name and a room</p>
        <div>
          <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <input id="roomField" placeholder="Room" className="joinInput mt-20" type="text" onInput={(event) => setRoom(event.target.value)} />
        </div>
        <button className={'button mt-20'} onClick={(e) => {
          e.preventDefault();
          console.log(e);
          generateRoomString();
        }}>Generate</button>
        <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/Main?name=${name}&room=${room}`}>
          <button className={'button mt-20'} type="submit">Sign In</button>
        </Link>
      </div>
    </div>
  );
}
