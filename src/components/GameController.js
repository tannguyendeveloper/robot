import DirectionalButton from "./DirectionalButton";
import { Button } from "antd";

const GameController = ({ disabled, handleDirectionalButtonClick, handleCommandClick }) => {
  return (
    <div className="flex bg-gray-700 items-center justify-between game-controller border border-gray-500 relative directional-buttons w-80 h-28 rounded-full">
      <div className="border-2 border-gray-600 border-box bg-gray-600 relative directional-buttons w-24 h-24 ml-2 rounded-full">
        <span className="absolute left-1 transform top-1/2 -translate-y-1/2">
          <DirectionalButton
            onClick={handleDirectionalButtonClick}
            title="Turn left"
            direction="left"
            value="L"
            disabled={disabled}
          />
        </span>
        <span className="absolute top-1 left-1/2 transform -translate-x-1/2">
          <DirectionalButton
            onClick={handleDirectionalButtonClick}
            title="Move forward"
            direction="up"
            className="absolute"
            value="F"
            disabled={disabled}
          />
        </span>
        <span className="absolute right-1 transform top-1/2  -translate-y-1/2">
          <DirectionalButton
            onClick={handleDirectionalButtonClick}
            title="Turn right"
            direction="right"
            className="absolute"
            value="R"
            disabled={disabled}
          />
        </span>
        <span className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
          <DirectionalButton
            onClick={handleDirectionalButtonClick}
            title="Move backward"
            direction="down"
            className="absolute"
            disabled
            value="B"
          />
        </span>
      </div>
      <Button
        size="small"
        shape="round"
        className="border-0 mr-2 
          bg-cyan-aqua-600 hover:bg-cyan-aqua-400 focus:bg-cyan-aqua-600 
          font-bold text-cyan-aqua-100 hover:text-white"
        disabled={disabled}
        onClick={handleCommandClick}
      >
        COMMAND!
      </Button>
    </div>
  );
};

export default GameController;
