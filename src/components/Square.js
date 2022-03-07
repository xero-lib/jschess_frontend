import { useDrop } from "react-dnd";
import { get_FEN } from "../jschess";
import { move, getPosition } from "./Board";

export default function Square({children, x, y, updateFEN, id}) {
    const [, drop] = useDrop(
        () => ({
          accept: "piece",
          drop: (item) => {
            const [start,,] = item.id.split('_');
            move(start, getPosition([y,x]));
            updateFEN(get_FEN())            
          }
        }),
        [x, y]
      )

    return (
        <div className="square" x={x} y={y} id={id} ref={drop}>
            {children}
        </div>
    )
}