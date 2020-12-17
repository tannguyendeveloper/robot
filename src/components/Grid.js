const Grid = ({ width = 0, height = 0, gameBoardRef }) => {
  const xAxis = [].concat([...Array(width).keys()]).reverse();
  const yAxis = [].concat([...Array(height).keys()]);

  return (
    <div ref={gameBoardRef} className="border inline-flex w-auto">
      {yAxis.map((x) => {
        return (
          <div data-x-axis={x} key={`col-${x}`}>
            {xAxis.map((y) => {
              return (
                <div
                  key={`square-${x}-${y}`}
                  data-x={x}
                  data-y={y}
                  className={`box-border
                    flex
                    justify-center
                    text-center
                    items-center 
                    h-8
                    w-8
                    ${
                      // Odd Colors
                      (x + y) % 2 === 0 ? "bg-gray-100" : ""
                    }
                    text-gray-500 text-xs`}
                >
                  {x},{y}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
