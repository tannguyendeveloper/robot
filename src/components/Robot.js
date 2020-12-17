import RobotSprite from "./robot.png";

const Robot = ({ robotRef }) => {
  return (
    <div
      ref={robotRef}
      className="robot animate absolute transform duration-200 w-8 h-8"
      style={{ opacity: 0 }}
    >
      <img src={RobotSprite} alt="Mr. Robot" className="block w-full" />
    </div>
  );
};

export default Robot;
