import "./css/Board.css";

//react
import { useState } from "react";

//jsc backend
import { compboard } from "../jschess/index.js";
import { makeMove } from "../jschess";

//jsc frontend
import fetchPiece from "../util/fetchPiece";
import Square from "./Square"

//rxjs
import { BehaviorSubject } from "rxjs";

//rdnd
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import calcOffsets from "../jschess/calc/calcOffsets.js";
import coordToPiece from "../jschess/util/coordToPiece";

const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
const columns = [1, 2, 3, 4, 5, 6, 7, 8];


export const boardSubject = new BehaviorSubject({
  board: compboard.slice().reverse()
});

export function getPosition([y, x]) {
  // let y = Math.abs(Math.floor(idx / 8) - 7)
  // let x = idx % 8;
  
  return `${files[x]}${8-y}`
}

export function move(start, end) {
  console.log(JSON.stringify(calcOffsets(coordToPiece(start))));
  if (start === end) { return }
  console.log("movement!", start, end);
  
  let legalMove = makeMove(start, end);

  if (legalMove === true) {
    boardSubject.next({board : compboard.slice().reverse()});
  }
}

function Board({board}) {
	// let [board, setBoard] = useState(compboard.slice().reverse());

  return (
    <div className="board">
      {columns.slice().reverse().map((_, y) => (
        <div key={y} className="row">
          {files.map((_, x) => (
            <Square key={x} x={x} y={y} children={
              (board[y][x].piece)
                  ? fetchPiece(board[y][x].piece.color, board[y][x].piece.symbol, getPosition([y,x]))
                  : <></>}
            />

          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
