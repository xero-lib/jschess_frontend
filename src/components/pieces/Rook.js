import { ItemTypes } from "../Constants";
import { useDrag } from "react-dnd";

function Rook({ color, position }) {
  const [{ isDragging }, drag] = useDrag({
    type: "piece",
    item: {
      id: `${position}_rook_${color}`
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      className="piece noselect"
      src={`./chess_pieces/${color.toLowerCase()}_rook.png`}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
			alt={`${color} Rook`}
    />
  );
}

export default Rook;
