import { useState } from "react";
import "./App.css";

//Create a randomNumber(a, b) helper function outside the App component
// It should return a random integer between a and b
// Use Math.random() and Math.floor()

function randomNumber(a, b) {
  return Math.floor(Math.random() * (b - a) + a);
}

//this is our new stats component 
function Stats({ score, lives, style}) {
  return (
    <div className="stats" style={style}>
      Score: {score} Lives: {lives}
    </div>
  )
}

function App() {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [appleSize, setAppleSize] = useState(100); //Create state variable appleSize with initial value of 100
  const [appleX, setAppleX] = useState(0); //equivalent to creating a global variable like let x = 0
  const [appleY, setAppleY] = useState(0); //equivalent to let y = 0

  function randomSpot() {
    setAppleX(randomNumber(0, 400));
    // console.log(appleX); //variable that contains the values
    setAppleY(randomNumber(0, 600));
    // console.log(appleY);
  }

  //Create a randomSize() function that
  //  sets appleSize to a random value between 20 and 100
  function randomSize() {
    const randomSize = randomNumber(20, 100);
    setAppleSize(randomSize);
  }

  function missTarget() {
    setLives(lives - 1);
    randomSize();
    randomSpot();
  }

  function clickTarget(event) {
    event.stopPropagation(); //prevents it from bubbling up to the parent or "clicking the parent as well as the child"
    setScore(score + 1);
    randomSize();
    randomSpot();
  }

  let statsStyle = {
    "background-color": "brown",
    color: "black",
  };

  if (score < 10) {
    statsStyle = {
      "background-color": "pink",
      color: "whitesmoke",
    };
  } else if (score > 10) {
    statsStyle = {
      "background-color": "darkGreen",
      color: "white",
    };
  } else if (score > 29) {
    statsStyle = {
      "background-color": "navy",
      color: "whitesmoke",
    };
  }

  const appleStyle = {
    position: "absolute",
    width: appleSize + "px",
    height: appleSize + "px",
    left: appleX + "px",
    top: appleY + "px",
  };

  return (
    <> 
    <Stats score={score} lives={lives} style={statsStyle} />
      <div className="orchard-background" onClick={missTarget}>
        { score < 100 ?
        <div
          className="apple-target"
          onClick={clickTarget}
          style={appleStyle}
        ></div>
       : <h1 className="win">YOU WIN!</h1>
      }
      </div>
    </>
  );
}

export default App;
