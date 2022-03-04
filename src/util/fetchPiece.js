import Pawn from "../components/pieces/Pawn"
import King from "../components/pieces/King";
import Queen from "../components/pieces/Queen";
import Rook from "../components/pieces/Rook.js";
import Bishop from "../components/pieces/Bishop";
import Knight from "../components/pieces/Knight";

export default function fetchPiece(color, symbol, position) {
    switch (symbol?.toLowerCase()) {
        case ('p'): return <Pawn color={ color } position={position} />;
        case ('r'): return <Rook color={ color } position={position} />;
        case ('k'): return <King color={ color } position={position} />;
        case ('q'): return <Queen color={ color } position={position} />;
        case ('b'): return <Bishop color={ color } position={position} />;
        case ('n'): return <Knight color={ color } position={position} />;
        default: break;
    }
}