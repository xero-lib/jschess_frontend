import "./css/Board.css";

//react
import { useState } from "react";

//jsc backend
import { makeMove, compboard, set_FEN, resetBoard, get_FEN } from "../jschess";

//jsc frontend
import fetchPiece from "../util/fetchPiece";
import Square from "./Square"

//rxjs
import { BehaviorSubject } from "rxjs";
import { turn } from "../jschess/util/makeMove";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const columns = [1, 2, 3, 4, 5, 6, 7, 8];

set_FEN("1k6/8/2Q5/8/8/2N5/PPP3PP/R3KBNR w KQ - 11 28");

export const boardSubject = new BehaviorSubject({
  board: compboard.slice().reverse()
});

export function getPosition([y, x]) {  
  return `${files[x]}${8-y}`
}


let globalPromote = 'q';

export function move(start, end) {
  if (start === end) { return }
  let moveResult = makeMove(start, end, globalPromote);

  if (moveResult) {
    boardSubject.next({board : compboard.slice().reverse()});
  }
  
  let
    check     = 1,
    checkmate = 2,
    stalemate = 3
  ;

  if (moveResult === check) {
    //check
  }

  if (moveResult === checkmate) {
    alert(`Checkmate! ${turn === "Dark" ? "Light" : "Dark"} wins!`); //invert because turn has already changed
  }

  if (moveResult === stalemate) {
    alert("Draw by stalemate!");
  }
}

function Board({ board, setBoardState }) {
	// let [board, setBoard] = useState(compboard.slice().reverse());
  let [side, setSide] = useState("Light");
  let [promote, setPromote] = useState('q');
  let [out_FEN, setOut_FEN] = useState(get_FEN());

  globalPromote = promote;

  const switchSide = () => {
    setSide((s) => s === "Light" ? "Dark" : "Light")
  }

  const reset = () => {
    resetBoard();
    setOut_FEN(get_FEN());
    setBoardState(compboard.slice().reverse());
  }

  let isLight = side === "Light";

  // useEffect(() => {
  //   setOut_FEN(get_FEN());
  // }, [board])

  return (
    <div className="body">
      <div className="header" style={{"paddingLeft": "1.25%", "paddingTop": ".5%"}}>
        <button onClick={reset}>Reset Board</button>
        <button onClick={switchSide}>Flip Board</button>
        <select>
          <option onClick={() => setPromote('q')}>Promote to Queen</option>
          <option onClick={() => setPromote('r')}>Promote to Rook</option>
          <option onClick={() => setPromote('b')}>Promote to Bishop</option>
          <option onClick={() => setPromote('n')}>Promote to Knight</option>
        </select>
        <div style={{"color": "white", "paddingLeft": ".5%", "fontSize": "300%"}}>It is {turn}'s turn</div>
      </div>
      <div className="board">
        {columns.slice().reverse().map((_, y) => (
          <div key={isLight ? y : 7-y} className="row">
            {files.map((_, x) => (
              <Square key={isLight ? x : 7-x} x={isLight ? x : 7-x} y={isLight ? y : 7-y} updateFEN={setOut_FEN} children={
                (board[isLight ? y : 7-y][isLight ? x : 7-x].piece)
                  ? fetchPiece(board[isLight ? y : 7-y][isLight ? x : 7-x].piece.color, board[isLight ? y : 7-y][isLight ? x : 7-x].piece.symbol, getPosition([(isLight ? y : 7-y), (isLight ? x : 7-x)]))
                  : <></>
              } />
            )
          )}</div>
        ))}
        </div>
      <code className="footer" style={{"color": "white", "background": "black", "paddingLeft": "1%", "paddingBottom": "1%"}}>{out_FEN}</code>
    </div>
  );
}

export default Board;
