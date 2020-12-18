import DirectionalButton from "./DirectionalButton";
import { Button } from "antd";

const GameController = ({ disabled, handleDirectionalButtonClick, handleCommandClick }) => {
  return (
    <div className="flex bg-gray-100 items-center justify-between game-controller border relative directional-buttons w-80 h-28 rounded-full">
      <div className="border-2 border-box bg-white relative directional-buttons w-24 h-24 ml-2 rounded-full">
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
        className="mr-2"
        disabled={disabled}
        onClick={handleCommandClick}
      >
        COMMAND!
      </Button>
    </div>
  );
};

export default GameController;
