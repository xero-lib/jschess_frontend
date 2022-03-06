import { useDrop } from "react-dnd";
import { move, getPosition } from "./Board";

export default function Square({children, x, y}) {
    const [, drop] = useDrop(
        () => ({
          accept: "piece",
          drop: (item) => {
            const [start,,] = item.id.split('_');
            move(start, getPosition([y,x]))
          }
        }),
        [x, y]
      )

    return (
        <div className="square" x={x} y={y} ref={drop}>
            {children}
        </div>
    )
}