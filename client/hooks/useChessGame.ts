import { useState } from "react";
import ChessGame from "@/logic/ChessGame";

export function useChessGame(initialFen?: string) {
  const [game, setGame] = useState(new ChessGame(initialFen));
  const [fen, setFen] = useState(game.fen);
  const [history, setHistory] = useState(game.moves);
  const [chessGame, setChessGame] = useState(game.getEngine());

  function makeMove(from: string, to: string) {
    const next = game.clone();
    try {
      if (next.move(from, to)) {
        setGame(next);
        setFen(next.fen);
        setHistory(next.moves);
        setChessGame(next.getEngine());
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  function undo() {
    const next = game.clone();
    next.undo();
    setGame(next);
    setFen(next.fen);
    setHistory(next.moves);
    setChessGame(next.getEngine());
  }

  function reset() {
    const next = new ChessGame();
    setGame(next);
    setFen(next.fen);
    setHistory([]);
    setChessGame(next.getEngine());
  }

  return {
    fen,
    history,
    makeMove,
    undo,
    reset,
    chessGame,
  };
}
