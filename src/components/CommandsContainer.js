import CommandAvatar from "./CommandAvatar";

const CommandsContainer = ({ commands = [] }) => {
  return (
    <div className="w-full mx-auto">
      <p className="font-Montserrat text-xs mb-1">
        <strong>Current Commands:</strong>
      </p>
      <div
        className="sequence-container p-1 border-2 rounded-md mb-2"
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
