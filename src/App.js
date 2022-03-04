import "./App.css";
import { useEffect, useState } from "react";
import Board from "./components/Board";
import { boardSubject } from "./components/Board";
import { compboard } from "./jschess";

function App() {
  const [board_state, setBoard_state] = useState(compboard.slice().reverse());
  useEffect(() => {
    const subscription = boardSubject.subscribe((sboard) =>
      setBoard_state(sboard.board)
    );
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <Board board={board_state} />
    </div>
  );
}

export default App;
