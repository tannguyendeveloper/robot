import { Avatar } from "antd";
import { IoGift } from "react-icons/io5";

const GoalMarker = ({ goalRef }) => {
  return (
    <Avatar
      ref={goalRef}
      icon={<IoGift />}
      className="block w-8 h-8 bg-yellow-400 absolute inline-flex items-center align-center content-center justify-center justify-items-center"
      style={{ opacity: 0 }}
    />
  );
};

export default GoalMarker;
