import React, { useState, useEffect} from "react";
import queryString from "query-string";
import io from "socket.io-client";
import adapter from 'webrtc-adapter';

import TextContainer from "../TextContainer/TextContainer";
import "./Main.css";

let socket;

const Main = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isOffered, setIsOffered] = useState(false);
  const ENDPOINT = "https://vast-shore-37325.herokuapp.com/";
  const pc_config = {"iceServers": [{urls : 'stun:stun.l.google.com:19302'}]};
  const [pc, setPC] = useState(new RTCPeerConnection(pc_config))

  let localVideoref = React.useRef();
  let remoteVideoref = React.useRef();

  useEffect(() => {

    const { name, room } = queryString.parse(location.search);
    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);

  useEffect(() => {


    socket.on("message", (message) => {
      setMessages((msgs) => [...msgs, message]);
    });
    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });

  }, [])

  useEffect(() => {

    socket.on('offerOrAnswer', (sdp) => {
      (sdp.type === "offer") ? setIsOffered(true) : setIsOffered(false)
      console.log("Offer/Answer ", JSON.stringify(sdp));
      pc.setRemoteDescription(new RTCSessionDescription(sdp))
    })

    socket.on('candidate', (candidate) => {
      console.log("candidate - ", candidate)
      if(candidate){
      pc.addIceCandidate(new RTCIceCandidate(candidate))
      }
    })

    pc.oniceconnectionstatechange = (e) => {
      console.log(e)
    }

    pc.ontrack = (e) => {
      remoteVideoref.current.srcObject = e.streams[0]
      remoteVideoref.current.controls = true;
    }

    pc.onicecandidate = (e) => {
      sendToPeer('candidate', e.candidate); 
    }

  }, [])

  const sendToPeer = (messageType, payload) => {
    socket.emit(messageType, {
      socketID: socket.id,
      payload,
    });
  };

  const sendOfferToSpecificPeer = (payload, target) => {
    socket.emit('OfferToSpecific', {
      socketID: socket.id,
      payload,
      target
    });
}

  const createAnswer = () => {
    console.log('Answer')
    pc.createAnswer({ offerToReceiveVideo: true})
      .then(sdp => {
        console.log(sdp)
        pc.setLocalDescription(sdp)
        sendToPeer('offerOrAnswer', sdp)
      })
      .then(setIsOffered(false))
  }

  const createOfferToSpecific = (target) => {
    console.log('OfferToSpecificPeer')
    pc.createOffer({ offerToReceiveVideo: true })
      .then(sdp => {
        console.log(sdp)
        pc.setLocalDescription(sdp)
        sendOfferToSpecificPeer(sdp, target)
    })
  }

  const startCapture = async () => {
     await navigator.mediaDevices
      .getDisplayMedia()
      .then((stream) => {
        //window.localStream = stream;
        localVideoref.current.srcObject = stream;
        localVideoref.current.controls = true;
        let localStream = stream.getTracks();
        console.log(localStream);
        localStream.forEach((track) => pc.addTrack(track, stream));
      })
      .catch((e) => {
        console.log("getDisplayMedia Error: ", e);
      })
      ;
  };

  const videoStyle = {
    backgroundColor: 'black',
    height: "40%",
    width: "90%",
    display: "table",
    margin: "auto"
  }

  return (
    <div className="outerContainer">
      <div className="container">
        <p>Din skärm</p>
        <video 
          style={videoStyle} ref={localVideoref} autoPlay></video>
        <button onClick={startCapture} style={{marginTop: "10px"}}>Testa bild</button>
        <hr />
        <p>Främmande skärm</p>
        <video
          style={videoStyle}
          id="remoteVideo"
          ref={remoteVideoref}
          autoPlay
        ></video>
        <p></p>
      </div>
      <TextContainer users={users} sendOfferToSpecificPeer={sendOfferToSpecificPeer} sendToPeer={sendToPeer} pc={pc} createOfferToSpecific={createOfferToSpecific} createAnswer={createAnswer} name={name} isOffered={isOffered} startCapture={startCapture}/>
    </div>
  );
};

export default Main;
