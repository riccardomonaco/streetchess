"use client";

import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessGame() {
  const [game, setGame] = useState(new Chess());

  function safeGameMutate(modify: (game: Chess) => void) {
    setGame((g) => {
      const updated = new Chess(g.fen());
      modify(updated);
      return updated;
    });
  }

  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = { from: sourceSquare, to: targetSquare, promotion: "q" };
    let moveResult = null;

    safeGameMutate((game) => {
      moveResult = game.move(move);
    });

    if (moveResult === null) return false;
    return true;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="text-2xl font-semibold mb-4">♟️ Chess Clone</h1>
      <Chessboard
      />
    </div>
  );
}
