import { useState, useEffect } from 'react';

import { Avatar } from 'antd';
import { IoGift } from 'react-icons/io5'

const GoalMarker = ({initialPosition, gameBoardRef}) => {
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
    setLeft(position.x);
    setTop(position.y);
  },[initialPosition, gameBoardRef])

    return(
        <Avatar 
            title="GOAL!"
            icon={<IoGift />}
            className="block w-8 h-8 bg-yellow-400 absolute inline-flex items-center align-center content-center justify-center justify-items-center"
            style={{top: top, left: left}}/>
    )
}

export default GoalMarker;