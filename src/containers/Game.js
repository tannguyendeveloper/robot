import { useState, useRef, useEffect } from 'react';

import Grid from '../components/Grid';
import GameController from '../components/GameController';
import Robot from '../components/Robot';
import GoalMarker from '../components/GoalMarker';
import CommandsContainer from '../components/CommandsContainer';
import DirectionalButton from '../components/DirectionalButton';
import WinnerModal from '../components/WinnerModal';
import LoserModal from '../components/LoserModal';

import { Button } from 'antd';

const Game = (props) => {  
  const gameBoardRef = useRef();
  const [ settings, setSettings ] = useState(props.settings);
  const [ showWinner, setShowWinner ] = useState(false);
  const [ showLoser, setShowLoser ] = useState(false);
  const [ gameStarted, setGameStarted ] = useState(false);

  // initial position of the robot on the game grid
  const [robotPosition, setRobotPosition] = useState(null);
  const [robotDirection, setRobotDirection] = useState(null);
  const [enableMovement, setMovement] = useState(false);
  
  // position of the goal
  const [goalPosition, setGoalPosition] = useState(null);
  
  // Max Grid Width & Height
  const [disabledController, setDisabledController] = useState(true);
  const [commands, setCommands] = useState([]);
  
  useEffect(() => {
    setSettings(props.settings);
  },[props.settings])

  const startNewGame = () => {
    setShowWinner(false);
    setShowLoser(false);
    
    setMovement(false)
    setCommands([]);
    // set robot position randomly on the grid
    const xPos = Math.floor(Math.random() * settings.gridWidth);
    const yPos = Math.floor(Math.random() * settings.gridHeight);
    setRobotPosition({x: xPos, y: yPos});

    // set the intial direction the robot is facing
    const directions = ['N','S','E','W'];
    const index = Math.floor(Math.random() * directions.length);
    let initialDirection = directions[index];
    setRobotDirection(initialDirection);

    // set goal's position randomly on the grid
    const goalPosX = Math.floor(Math.random() * settings.gridWidth);
    const goalPosY = Math.floor(Math.random() * settings.gridHeight);
    setGoalPosition({x: goalPosX, y: goalPosY});

    // set the game to start
    setGameStarted(true);

    // enable the controller
    setDisabledController(false);
  }

  const handleLoseGame = () => {
    setMovement(false)
    setDisabledController(true);
    setShowLoser(true);
  }

  const handleWinGame = () => {
    setMovement(false)
    setDisabledController(true);
    setShowWinner(true);
  }


  const startRobotMovement = () => {
    // if commands are not empty
    if(commands.length) {
      setDisabledController(true);
      setMovement(true)
    }
    // disable all the buttons on the controller
  }

  const handleControllerButtonClick = (e) => {
    const command = e.currentTarget.value;
    setCommands([...commands,command])
  }

  return (
    <div className="game">

      { gameStarted
        ? <>
            <GoalMarker
              initialPosition={goalPosition}
              gameBoardRef={gameBoardRef} 
            />
            <Robot 
              initialPosition={robotPosition}
              winningPosition={goalPosition}
              enableMovement={enableMovement}
              gameBoardRef={gameBoardRef} 
              initialDirection={robotDirection}
              handleLoseGame={handleLoseGame}
              handleWinGame={handleWinGame}
              commands={commands}
            />
          </>
        : null
      }

      { showWinner
        ? <WinnerModal
            onOk={startNewGame}
            visible={showWinner}
          />
        : null }

      { showLoser
        ? <LoserModal
            onOk={startNewGame}
            visible={showLoser}
          />
        : null }


      <div className="flex w-2/3 mx-auto justify-around items-center">
        <Grid
          gameBoardRef={gameBoardRef}
          width={props.settings.gridWidth}
          height={props.settings.gridHeight}
          enabled={gameStarted}
        />
        <div className="flex flex-col">
          <GameController
            disabled={disabledController}
            onReset={startNewGame}
            onClick={handleControllerButtonClick}
            onSubmit={startRobotMovement}
          />
        </div>
      </div>

      <div className="flex w-1/2 my-5 mx-auto justify-around items-center">
      {
        gameStarted
        ? <CommandsContainer commands={commands} />
        : <Button onClick={startNewGame} className="mt-2 mb-5">Start New Game!</Button>
      }
      </div>
      <div className="w-1/2 my-5 mx-auto">
          <h2 className="font-Arvo text-lg text-center bold mb-2">Game Controls</h2>
          <ul className="flex justify-between">
            <li className="my-1 text-xs"><DirectionalButton direction="up" size="small"/> Move Mr. Robot forward</li>
            <li className="my-1 text-xs"><DirectionalButton direction="left" size="small"/> Have Mr. Robot turn left</li>
            <li className="my-1 text-xs"><DirectionalButton direction="right" size="small"/> Have Mr. Robot turn right</li>
          </ul>
      </div>

    </div>
  )
}

export default Game;