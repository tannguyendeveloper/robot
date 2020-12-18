import CommandAvatar from "./CommandAvatar";

const CommandsContainer = ({ commands = [] }) => {
  return (
    <div className="w-full mx-auto">
      <p className="text-base mb-1 text-cyan-aqua-100">
        <strong>Current Commands:</strong>
      </p>
      <div
        className="sequence-container p-1 rounded-md mb-2 bg-cyan-aqua-100 shadow-md shadow-inner"
        style={{ minHeight: "36px" }}
      >
        {commands.map((command, index) => (
          <CommandAvatar key={`${command}-${index}`} command={command} />
        ))}
      </div>
    </div>
  );
};

export default CommandsContainer;
