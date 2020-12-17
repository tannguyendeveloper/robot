import { Button } from "antd";

import {
  IoCaretForward,
  IoCaretBack,
  IoCaretDown,
  IoCaretUp,
} from "react-icons/io5";
const DirectionalButton = ({ direction, ...props }) => {
  const icon = (direction) => {
    switch (direction) {
      case "up":
        return <IoCaretUp />;
      case "down":
        return <IoCaretDown />;
      case "left":
        return <IoCaretBack />;
      case "right":
        return <IoCaretForward />;
      default:
        return <></>;
    }
  };
  return (
    <Button
      {...props}
      shape="circle"
      type="primary"
      className="inline-flex items-center align-center content-center justify-center justify-items-center"
    >
      {icon(direction)}
    </Button>
  );
};

export default DirectionalButton;
