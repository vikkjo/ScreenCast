import React from 'react';

import './TextContainer.css';

const TextContainer = (props) => (
  <div className="textContainer">
    {
      props.users
        ? (
          <div>
            <h1>People in the room:</h1>
            <div className="activeContainer">
              <h2>
                {props.users.map((user) => (
                  <div key={user.name} className="activeItem">
                    <span className="spanText">{user.name}</span>
                    {props.name === user.name ? 
                    " (You)" 
                    : 
                    props.isOffered ? <span>
                    <button onClick={() => props.createAnswer()}>Acceptera skärmdelning</button>
                    <button onClick={null}>Neka</button>
                    </span>:
                    <button onClick={async () => {
                      await props.startCapture()
                      props.createOfferToSpecific(user.id)
                    }}>Erbjud skärmdelning</button>

                    }
                  </div>
                ))}
              </h2>
            </div>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;