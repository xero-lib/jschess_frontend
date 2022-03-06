import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/Board";
import { boardSubject } from "./components/Board";
import { compboard } from "./jschess";

function App() {
  const [boardState, setBoardState] = useState(compboard.slice().reverse());
  useEffect(() => {
    const subscription = boardSubject.subscribe((sboard) =>
      setBoardState(sboard.board)
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <Board board={boardState} setBoardState={setBoardState} />
    </div>
  );
}

export default App;
