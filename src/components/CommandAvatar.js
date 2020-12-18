import { Avatar } from "antd";

import {
  IoCaretForward,
  IoCaretBack,
  IoCaretDown,
  IoCaretUp,
} from "react-icons/io5";

const CommandAvatar = ({ command, isCurrentCommand, ...props }) => {
  const icon = (command) => {
    switch (command) {
      case "F":
        return <IoCaretUp />;
      case "B":
        return <IoCaretDown />;
      case "L":
        return <IoCaretBack />;
      case "R":
        return <IoCaretForward />;
      default:
        return <></>;
    }
  };
  console.log(isCurrentCommand)
  return (
    <Avatar
      {...props}
      size={24}
      className={`
        inline-flex
        items-center
        align-center
        content-center
        justify-center
        justify-items-center
        mx-1
        bg-cyan-aqua-${isCurrentCommand?700:500}
        `}
      icon={icon(command)}
    />
  );
};

export default CommandAvatar;
