import "./css/Board.css";

//react
import { useEffect, useState } from "react";

//jsc backend
import { makeMove, compboard, set_FEN, resetBoard, get_FEN, getKingPos, getPly } from "../jschess";

//jsc frontend
import fetchPiece from "../util/fetchPiece";
import Square from "./Square"

//rxjs
import { BehaviorSubject } from "rxjs";
import { turn } from "../jschess/util/makeMove";
import getWatches from "../jschess/util/getAllWatches";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const columns = [1, 2, 3, 4, 5, 6, 7, 8];

// set_FEN("1k6/8/2Q5/8/8/2N5/PPP3PP/R3KBNR w KQ - 11 28");

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

  let csqr_loc = getKingPos(getPly() === "Light" ? "Dark" : "Light");
  let osqr_loc = getKingPos(getPly());
  let ckingElement = document.getElementById(`${7-csqr_loc[0]}_${csqr_loc[1]}`).children[0];
  let okingElement = document.getElementById(`${7-osqr_loc[0]}_${osqr_loc[1]}`).children[0];

  if (moveResult === check) {
    okingElement.classList.add("checked");
  } else {
    ckingElement.classList.remove("checked");
  }

  if (moveResult === checkmate) {
    ckingElement.classList.add("checked");
    document.getElementById("turnheader").textContent = `Checkmate! ${turn === "Dark" ? "Light" : "Dark"} wins!`;
  } else if ([true, 1, 3].includes(moveResult)) {
    document.getElementById("turnheader").textContent = `It is ${turn}'s turn.`;
  }

  if (moveResult === stalemate) {
    document.getElementById("turnheader").textContent = `Stalemate!`;
  }
}

function Board({ board, setBoardState }) {
	// let [board, setBoard] = useState(compboard.slice().reverse());
  let [side, setSide] = useState("Light");
  let [promote, setPromote] = useState('q');
  let [out_FEN, setOut_FEN] = useState(get_FEN());

  useEffect(() => {
    document.getElementById("turnheader").textContent = `It is ${turn}'s turn.`
  }, []);

  globalPromote = promote;

  const switchSide = () => {
    setSide((s) => s === "Light" ? "Dark" : "Light")
  }

  const reset = () => {
    resetBoard();
    setOut_FEN(get_FEN());
    setBoardState(compboard.slice().reverse());
    let dKingPos = getKingPos("Dark");  document.getElementById(`${dKingPos[0]}_${dKingPos[1]}`)?.children[0]?.classList.remove("checked");
    let lKingPos = getKingPos("Light"); document.getElementById(`${lKingPos[0]}_${lKingPos[1]}`)?.children[0]?.classList.remove("checked");
    document.getElementById("turnheader").textContent = `It is ${turn}'s turn.`
  }

  let isLight = side === "Light";

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
        <div id={"turnheader"} style={{"color": "white", "paddingLeft": ".5%", "fontSize": "300%"}} />
      </div>
      <div className="board">
        {columns.slice().reverse().map((_, y) => (
          <div key={isLight ? y : 7-y} className="row">
            {files.map((_, x) => (
              <Square key={isLight ? x : 7-x} id={`${isLight ? y : 7-y}_${isLight ? x : 7-x}`} x={isLight ? x : 7-x} y={isLight ? y : 7-y} updateFEN={setOut_FEN} children={
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
