import { useDrag } from "react-dnd";

function Queen({ color, position }) {
  const [{ isDragging }, drag] = useDrag({
    type: "piece",
    item: {
      id: `${position}_queen_${color}`
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      className="piece noselect"
      src={`./chess_pieces/${color.toLowerCase()}_queen.png`}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
			alt={`${color} Pawn`}
    />
  );
}

export default Queen;
