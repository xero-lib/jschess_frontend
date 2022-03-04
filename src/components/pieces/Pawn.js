import { ItemTypes } from "../Constants";
import { useDrag } from "react-dnd";

function Pawn({ color, position }) {
  const [{ isDragging }, drag] = useDrag({
    type: "piece",
    item: {
      id: `${position}_pawn_${color}`
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      className="piece noselect"
      src={`./chess_pieces/${color.toLowerCase()}_pawn.png`}
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: "grab",
      }}
			alt={`${color} Pawn`}
    />
  );
}

export default Pawn;
