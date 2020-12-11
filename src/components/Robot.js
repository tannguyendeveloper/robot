import { useState, useEffect, useRef } from 'react';
import RobotSprite from './robot.png'

const Robot = ({
  handleWinGame,
  handleLoseGame,
  enableMovement,
  initialPosition,
  initialDirection,
  winningPosition,
  commands,
  gameBoardRef}) => {

  const positionRef = useRef(null);
  const rotationRef = useRef(null);
  
  // states that control the position of the robot
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);

  // Effect that determins the inital position and direction
  useEffect((state) => {
    const getPosition = ({x, y}) => {
      // find the div that we want to get the position from the gameBoard
      if (gameBoardRef.current) {
        const columns = [...gameBoardRef.current.children];
        // the column on the x axis that contains squares
        const column = columns.find(col => col.dataset.xCol === String(x));
        const squares = [...column.childNodes];
        // the square 
        const square = squares.find(el => {
          // convert DomStringMap into object;
          let coordinates = Object.assign({}, el.dataset);
          return coordinates.y === String(y);
        })
        // the position of the square we want Mr. Robot to be placed
        const pos = square.getBoundingClientRect();
        let posX = (pos.left);
        let posY = (pos.top);
        return {x:posX, y:posY};
      }
    }
    const position = getPosition(initialPosition);
    let rotation = 0; 
    if(initialDirection === "N") {
      rotation = 0;
    } else if (initialDirection === "S") {
      rotation = 180;
    } else if (initialDirection === "E") {
      rotation = 90;
    } else if (initialDirection === "W") {
      rotation = -90;
    }
    setLeft(position.x);
    setTop(position.y);
    positionRef.current.style.transform = `rotate(${rotation}deg)`;
    if(winningPosition.x === initialPosition.x && winningPosition.y === initialPosition.y) {
      setTimeout(()=>{handleWinGame()}, 600);
    }
  },[initialPosition, initialDirection, winningPosition, gameBoardRef])

  // Effect that moves the robot
  useEffect(() => {

    const getPosition = ({x, y}) => {
      // find the div that we want to get the position from the gameBoard
      if (gameBoardRef.current) {
        const columns = [...gameBoardRef.current.children];
        // the column on the x axis that contains squares
        const column = columns.find(col => col.dataset.xCol === String(x));
        if(!column)  { handleLoseGame(); return false};
        const squares = [...column.childNodes];
        // console.log(squares);
        // the square 
        const square = squares.find(el => {
          // convert DomStringMap into object;
          let coordinates = Object.assign({}, el.dataset);
          return coordinates.y === String(y);
        })

        if(square) {
          // the position of the square we want Mr. Robot to be placed
          const pos = square.getBoundingClientRect();
          // get the center of the element
          let posX = (pos.left);
          let posY = (pos.top);
          return {x:posX, y:posY};
        } else {
          handleLoseGame();
        }
      }
    }
    
    let x = initialPosition.x;
    let y = initialPosition.y;

    const moveRobot = () => {
      let position;
      let direction = initialDirection;
      let rotation;
      commands.forEach(command=> {
          if(command === "F" && direction === "N") {
            y++;
          } else if(command === "F" && direction === "S") {
            y--;
          } else if(command === "F" && direction === "E") {
            x++;
          } else if(command === "F" && direction === "W") {
            x--;
          } else if(command === "L" && direction === "N") {
            direction = "W"
          } else if(command === "L" && direction === "S") {
            direction = "E"
          } else if(command === "L" && direction === "E") {
            direction = "N"
          } else if(command === "L" && direction === "W") {
            direction = "S"
          } else if(command === "R" && direction === "N") {
            direction = "E"
          } else if(command === "R" && direction === "S") {
            direction = "W"
          } else if(command === "R" && direction === "E") {
            direction = "S"
          } else if(command === "R" && direction === "W") {
            direction = "N"
          }
          if(direction === "N") {
            rotation = 0;
          } else if (direction === "S") {
            rotation = 180;
          } else if (direction === "E") {
            rotation = 90;
          } else if (direction === "W") {
            rotation = -90;
          }
          position = getPosition({x,y});
          if(!position) { handleLoseGame(); return false; } 
          positionRef.current.style.left = `${position.x}px`;
          positionRef.current.style.top = `${position.y}px`;
          positionRef.current.style.transform = `rotate(${rotation}deg)`;
      })
    }
    if(enableMovement) {
      moveRobot();
      if(winningPosition.x === x && winningPosition.y === y) {
        setTimeout(()=>{handleWinGame()}, 600);
      } else {
        setTimeout(() =>{handleLoseGame()}, 600);
      }
    }
  },[winningPosition, enableMovement, initialPosition, initialDirection, commands, gameBoardRef, handleLoseGame, handleWinGame])

  return (
    <div ref={positionRef} className="robot animate absolute transform duration-500 w-8 h-8" style={{top: top, left: left}}>
      <img ref={rotationRef} src={RobotSprite} alt="Mr. Robot" className="block w-full"/>
    </div>
  )
}

export default Robot;