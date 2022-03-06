import { useDrag } from "react-dnd";

function Bishop({ color, position }) {
	const [{ isDragging }, drag] = useDrag({
		item: {
			id: `${position}_bishop_${color}`
		},
		type: "piece",
		collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
	})

  return (
    <img
      className="piece noselect"
      src={`./chess_pieces/${color.toLowerCase()}_bishop.png`}
      ref={drag}
      style={{
        opacity: isDragging ? 0 : 1,
        cursor: "grab",
      }}
			alt={`${color} Bishop`}
    />
  );
}

export default Bishop;
