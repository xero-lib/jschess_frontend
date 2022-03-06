import { useDrag } from "react-dnd";

function Knight({ color, position }) {
  const [{ isDragging }, drag] = useDrag({
    type: "piece",
    item: {
      id: `${position}_knight_${color}`
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      className="piece noselect"
      src={`./chess_pieces/${color.toLowerCase()}_knight.png`}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
			alt={`${color} Knight`}
    />
  );
}

export default Knight;
