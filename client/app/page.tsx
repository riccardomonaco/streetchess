"use client";

import ChessboardComponent from "@/components/ChessboardComponent";
import { useChessGame } from "@/hooks/useChessGame";

export default function Home() {
  const { fen, history, makeMove, undo, reset, chessGame } = useChessGame();

  return (
    <main>
      <div className="flex justify-center gap-8 p-8 bg-gray-900 text-white min-h-screen">
        {/* Left panel */}
        <div className="w-1/4">
          <h2 className="text-xl font-semibold mb-4">Moves</h2>
          {/*<MoveList moves={history} />*/}
          <div className="mt-4 flex gap-2">
            <button
              onClick={undo}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              Undo
            </button>
            <button
              onClick={reset}
              className="px-3 py-1 bg-gray-700 rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Chessboard */}
        <div className="flex-1 flex justify-center items-center">
          <ChessboardComponent
            fen={fen}
            onDrop={makeMove}
            game={chessGame}
            onClick={makeMove}
          />
        </div>
      </div>
    </main>
  );
}
