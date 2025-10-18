import { useState } from "react";
import ChessGame from "@/logic/ChessGame";
import { Chess, Move } from "chess.js";

export default function MoveList({ moves }: { moves: Move[] }) {
  return (
    <div className="bg-gray-800 p-3 rounded h-[600px] overflow-y-auto">
      {moves.map((m, i) => (
        <div key={i} className="text-sm text-gray-300">
          {i + 1}. {m.from} → {m.to}
        </div>
      ))}
    </div>
  );
}
