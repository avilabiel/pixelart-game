import React, { useState, useEffect } from "react";
import "./style.css";

interface CharProps {}

const SPACE_KEY = 32;
const A_KEY = 65;
const D_KEY = 68;
const P_KEY = 80;
const S_KEY = 83;
const W_KEY = 87;

const CharComponent: React.FC<CharProps> = (props) => {
  const [classes, setClasses] = useState<string[]>(["stopped"]);
  const [direction, setDirection] = useState<string>("right");

  useEffect(() => {
    const handleButtonPress = (event: any) => {
      console.log(`PRESSING: ${event.keyCode}`);

      if (event.keyCode === SPACE_KEY) {
        setClasses([direction, "pre-special-attack"]);

        setTimeout(() => {
          setClasses([direction, "die"]);
          setTimeout(() => {
            setClasses([direction, "special-attack"]);
            setTimeout(() => setClasses([direction]), 1000);
          }, 1000);
        }, 1000);
      }

      if (event.keyCode === P_KEY) {
        setClasses([direction, "attack"]);
      }

      if (event.keyCode === A_KEY) {
        setDirection("left");
        setClasses(["left"]);
      }

      if (event.keyCode === D_KEY) {
        setDirection("right");
        setClasses(["right"]);
      }

      if (event.keyCode === S_KEY) {
        setDirection("down");
        setClasses(["down"]);
      }

      if (event.keyCode === W_KEY) {
        setDirection("up");
        setClasses(["up"]);
      }
    };

    const stopActions = () => {
      console.log("STOP PRESSING!!!!");

      setClasses([direction, "stopped"]);
    };

    window.addEventListener("keydown", handleButtonPress);
    window.addEventListener("keyup", stopActions);

    return () => {
      window.removeEventListener("keydown", handleButtonPress);
      window.removeEventListener("keyup", stopActions);
    };
  }, [direction, classes]);

  return (
    <div>
      <h1>Char</h1>
      <div className={"char " + classes.join(" ")}></div>
    </div>
  );
};

export default CharComponent;
