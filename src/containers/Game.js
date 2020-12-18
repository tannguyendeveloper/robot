import { useState, useRef, useEffect } from "react";

import Grid from "../components/Grid";
import GameController from "../components/GameController";
import Robot from "../components/Robot";
import GoalMarker from "../components/GoalMarker";
import CommandsContainer from "../components/CommandsContainer";
import DirectionalButton from "../components/DirectionalButton";
import WinnerModal from "../components/WinnerModal";
import LoserModal from "../components/LoserModal";

import { Button } from "antd";

const Game = ({ setIsSettingsDisabled, ...props }) => {
  const gameBoardRef = useRef();
  const robotRef = useRef();
  const goalRef = useRef();

  const [settings, setSettings] = useState(props.settings);
  const [showWinner, setShowWinner] = useState(false);
  const [showLoser, setShowLoser] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  // initial position of the robot on the game grid
  const [robotPosition, setRobotPosition] = useState(null);
  const [robotDirection, setRobotDirection] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [runCommands, setRunCommands] = useState(false);
  const [commandIndex, setCommandIndex] = useState(0);

  // position of the goal
  const [goalPosition, setGoalPosition] = useState(null);

  // Max Grid Width & Height
  const [disabledController, setDisabledController] = useState(true);
  const [commands, setCommands] = useState([]);

  useEffect(() => {
    setSettings(props.settings);
  }, [props.settings]);

  const resetGame = () => {
    updatePosition(robotRef, { x: 0, y: 0 }, 0, 0);
    updatePosition(goalRef, { x: 0, y: 0 }, 0, 0);
    setShowWinner(false);
    setShowLoser(false);
    setRotation(0);
    setRunCommands(false);
    setCommandIndex(0);
    setCommands([]);
    setShowLoser(false);
    setShowWinner(false);
    setIsSettingsDisabled(false);
    setGameStarted(false);
  };

  const updatePosition = (ref, coordinates, rotation, opacity = 1) => {
    ref.current.style.left = `${coordinates.x}px`;
    ref.current.style.top = `${coordinates.y}px`;
    ref.current.style.opacity = opacity;
    ref.current.style.transform = `rotate(${rotation}deg)`;
  };

  const startNewGame = () => {
    resetGame();
    setIsSettingsDisabled(true);
    // set robot position randomly on the grid
    const xPos = Math.floor(Math.random() * settings.gridWidth);
    const yPos = Math.floor(Math.random() * settings.gridHeight);
    setRobotPosition({ x: xPos, y: yPos });

    const coordinates = getPosition({ x: xPos, y: yPos });
    // set the intial direction the robot is facing
    const directions = ["N", "S", "E", "W"];
    const index = Math.floor(Math.random() * directions.length);
    let initialDirection = directions[index];
    setRobotDirection(initialDirection);
    let rotation;
    switch (initialDirection) {
      case "N":
        rotation = 0;
        break;
      case "S":
        rotation = 180;
        break;
      case "E":
        rotation = 90;
        break;
      case "W":
        rotation = 270;
        break;
      default:
        rotation = 0;
        break;
    }
    setRotation(rotation);
    updatePosition(robotRef, coordinates, rotation, 1);

    // set goal's position randomly on the grid
    const goalPosX = Math.floor(Math.random() * settings.gridWidth);
    const goalPosY = Math.floor(Math.random() * settings.gridHeight);
    setGoalPosition({ x: goalPosX, y: goalPosY });
    const goalCoordinates = getPosition({ x: goalPosX, y: goalPosY });
    updatePosition(goalRef, goalCoordinates, 0, 1);

    // set the game to start
    setGameStarted(true);

    // enable the controller
    setDisabledController(false);
  };

  const handleLoseGame = () => {
    setIsSettingsDisabled(false);
    setRunCommands(false);
    setDisabledController(true);
    setShowLoser(true);
  };

  const handleWinGame = () => {
    setIsSettingsDisabled(false);
    setRunCommands(false);
    setDisabledController(true);
    setShowWinner(true);
  };

  const getPosition = ({ x = 0, y = 0 }) => {
    // Referencing the game board
    if (gameBoardRef.current) {
      // Getting the columns (x axis of the game board)
      const columns = [...gameBoardRef.current.children];
      // Find the column with xAxis == X
      const column = columns.find((col) => col.dataset.xAxis === String(x));
      // x coordinate is not on grid
      if (!column) return false;
      const squares = [...column.childNodes];
      // Find the square with the data-y
      // Square is location we want mr robot to be placed
      const square = squares.find((el) => {
        // convert DomStringMap into object;
        let data = Object.assign({}, el.dataset);
        return data.y === String(y);
      });
      // If square does not exist then that means Mr.Robot has stepped off the grid
      if (square) {
        const pos = square.getBoundingClientRect();
        let posX = pos.left;
        let posY = pos.top;
        return { x: posX, y: posY };
      } else {
        return false;
      }
    }
  };

  const startRunningCommands = () => {
    if (commands.length) {
      setDisabledController(true);
      setRunCommands(true);
    }
  };

  useEffect(() => {
    if (runCommands) {
      let command = commands[commandIndex];
      let newPosition = robotPosition;
      let newDirection = robotDirection;
      let newRotation = rotation;

      if (command === "F" && robotDirection === "N") {
        newPosition.y++;
      } else if (command === "F" && robotDirection === "S") {
        newPosition.y--;
      } else if (command === "F" && robotDirection === "E") {
        newPosition.x++;
      } else if (command === "F" && robotDirection === "W") {
        newPosition.x--;
      } else if (command === "L" && robotDirection === "N") {
        newDirection = "W";
        newRotation -= 90;
      } else if (command === "L" && robotDirection === "S") {
        newDirection = "E";
        newRotation -= 90;
      } else if (command === "L" && robotDirection === "E") {
        newDirection = "N";
        newRotation -= 90;
      } else if (command === "L" && robotDirection === "W") {
        newDirection = "S";
        newRotation -= 90;
      } else if (command === "R" && robotDirection === "N") {
        newDirection = "E";
        newRotation += 90;
      } else if (command === "R" && robotDirection === "S") {
        newDirection = "W";
        newRotation += 90;
      } else if (command === "R" && robotDirection === "E") {
        newDirection = "S";
        newRotation += 90;
      } else if (command === "R" && robotDirection === "W") {
        newDirection = "N";
        newRotation += 90;
      }

      let coordinates = getPosition(newPosition);
      if (!coordinates) handleLoseGame();
      updatePosition(robotRef, coordinates, newRotation, 1);

      setTimeout(() => {
        // if we are not at the end of commands
        if (commandIndex < commands.length - 1) {
          if (newRotation !== rotation) setRotation(newRotation);
          if (newDirection !== robotDirection) setRobotDirection(newDirection);
          setCommandIndex(commandIndex + 1);
        } else {
          // check for the winner
          if (
            newPosition.x === goalPosition.x &&
            newPosition.y === goalPosition.y
          ) {
            handleWinGame();
          } else {
            handleLoseGame();
          }
        }
      }, 275);
    }
  }, [runCommands, commandIndex]);

  const handleDirectionalButtonClick = (e) => {
    const command = e.currentTarget.value;
    setCommands([...commands, command]);
  };

  return (
    <div className="game">
      {showWinner ? (
        <WinnerModal
          onOk={startNewGame}
          onCancel={resetGame}
          visible={showWinner}
        />
      ) : null}

      {showLoser ? (
        <LoserModal
          onOk={startNewGame}
          onCancel={resetGame}
          visible={showLoser}
        />
      ) : null}

      <div className="flex flex-col md:flex-row w-full xs:w-full md:w-3/4 lg:2/3 mx-auto mb-5 justify-around items-center">
        <div className="my-2">
          <Grid
            gameBoardRef={gameBoardRef}
            width={props.settings.gridWidth}
            height={props.settings.gridHeight}
            enabled={gameStarted}
          />
          <GoalMarker goalRef={goalRef} />
          <Robot robotRef={robotRef} />
        </div>
        <div className="flex flex-col">
          <GameController
            disabled={disabledController}
            onResetGameClick={startNewGame}
            onStartGameClick={startNewGame}
            handleCommandClick={startRunningCommands}
            handleDirectionalButtonClick={handleDirectionalButtonClick}
          />
        </div>
      </div>

      <div className="flex w-full mx-5 md:w-3/4 lg:w-3/4 mx-auto justify-around items-center">
        {gameStarted ? (
          <div className="w-full px-2 md:p-0">
            <CommandsContainer
              commandsStarted={runCommands}
              commandIndex={commandIndex}
              commands={commands}
            />
          </div>
        ) : (
          <button
            onClick={startNewGame}
            className="flex bg-tulip-tree-500 py-2 px-5 text-2xl rounded-full text-cyan-aqua-800 font-Luckiest-Guy hover:shadow-lg hover:text-cyan-aqua-700"
          >
            Start New Game!
          </button>
        )}
      </div>
      <div className="w-full md:w-3/4 lg:w-3/4 my-5 mx-auto">
        <h2 className="font-Luckiest-Guy text-lg text-center bold mb-2 text-cyan-aqua-200">
          Game Controls
        </h2>
        <ul className="flex justify-between">
          <li className="my-1 text-xs xs:text-base text-cyan-aqua-100">
            <DirectionalButton direction="up" size="small" /> Move Mr. Robot
            forward
          </li>
          <li className="my-1 text-xs xs:text-base text-cyan-aqua-100">
            <DirectionalButton direction="left" size="small" /> Have Mr. Robot
            turn left
          </li>
          <li className="my-1 text-xs xs:text-base text-cyan-aqua-100">
            <DirectionalButton direction="right" size="small" /> Have Mr. Robot
            turn right
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Game;
