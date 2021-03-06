import { useDrag } from "react-dnd";

function King({ color, position }) {
  const [{ isDragging }, drag] = useDrag({
    type: "piece",
    item: {
      id: `${position}_king_${color}`
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div style={{"height": "inherit"}}>
      <img
        className="piece noselect"
        src={`./chess_pieces/${color.toLowerCase()}_king.png`}
        ref={drag}
        style={{
          opacity: isDragging ? 0.5 : 1,
          cursor: "grab",
        }}
        alt={`${color} King`}
      />
    </div>
  );
}

export default King;
