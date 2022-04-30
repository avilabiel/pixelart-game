import React, { useState, useEffect } from "react";
import "./style.css";

interface CharProps {}

const SPACE_KEY = 32;
const A_KEY = 65;
const D_KEY = 68;
const P_KEY = 80;
const S_KEY = 83;
const W_KEY = 87;
const CTRL_KEY = 17;

type CharPosition = {
  x: number;
  y: number;
};

const CharComponent: React.FC<CharProps> = (props) => {
  const [classes, setClasses] = useState<string[]>(["stopped"]);
  const [direction, setDirection] = useState<string>("down");
  const [position, setPosition] = useState<CharPosition>({ x: 0, y: 0 });
  const [positionChar2, setPositionChar2] = useState<CharPosition>({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    const handleButtonPress = (event: any) => {
      console.log(`PRESSING: ${event.keyCode}`);

      if (event.keyCode === SPACE_KEY) {
        setClasses(["pre-special-attack"]);

        setTimeout(() => {
          setClasses(["die"]);
          setTimeout(() => {
            setClasses(["special-attack"]);
            setTimeout(() => setClasses([]), 1000);
          }, 1000);
        }, 1000);
      }

      if (event.keyCode === P_KEY) {
        setClasses(["attack"]);
      }

      if (event.keyCode === A_KEY) {
        setDirection("left");
        setClasses(["left"]);
        setPosition((charPosition) => {
          if (charPosition.x === 0) {
            return charPosition;
          }

          return { ...charPosition, x: charPosition.x - 6 };
        });
      }

      if (event.keyCode === D_KEY) {
        setDirection("right");
        setClasses(["right"]);
        setPosition((charPosition) => {
          console.log("Position", charPosition);
          if (charPosition.x - 24 === window.screen.width) {
            return charPosition;
          }

          return { ...charPosition, x: charPosition.x + 6 };
        });
      }

      if (event.keyCode === S_KEY) {
        setDirection("down");
        setClasses(["down"]);
        setPosition((charPosition) => {
          return { ...charPosition, y: charPosition.y + 6 };
        });
      }

      if (event.keyCode === W_KEY) {
        setDirection("up");
        setClasses(["up"]);
      }

      if (event.keyCode === CTRL_KEY) {
        // Get inputs
      }
    };

    const stopActions = () => {
      console.log("STOP PRESSING!!!!");

      setClasses(["stopped"]);
    };

    window.addEventListener("keydown", handleButtonPress);
    window.addEventListener("keyup", stopActions);

    return () => {
      window.removeEventListener("keydown", handleButtonPress);
      window.removeEventListener("keyup", stopActions);
    };
  }, [classes]);

  return (
    <div>
      <h1>Char</h1>
      <div
        className={"char " + direction + " " + classes.join(" ")}
        style={{ top: position.y, left: `${position.x}px` }}
      ></div>
      <div
        className={"char " + direction + " " + classes.join(" ")}
        style={{ top: positionChar2.y, left: `${positionChar2.x}px` }}
      ></div>
    </div>
  );
};

export default CharComponent;
