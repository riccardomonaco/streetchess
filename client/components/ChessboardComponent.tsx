"use client";

import ChessGame from "@/logic/ChessGame";
import { useEffect, useState, useRef } from "react";
import { Chess, Square } from "chess.js";
import {
  Chessboard,
  PieceDropHandlerArgs,
  SquareHandlerArgs,
} from "react-chessboard";

export default function ChessboardComponent({
  onDrop,
  onClick,
  fen,
  game,
}: {
  onDrop: (from: string, to: string) => boolean;
  onClick: (from: string, to: string) => boolean;
  fen: string;
  game: Chess;
}) {
  // track the current position of the chess game in state to trigger a re-render of the chessboard
  const [moveFrom, setMoveFrom] = useState("");
  const [optionSquares, setOptionSquares] = useState({});
  const [showAnimations, setShowAnimations] = useState(true);
  const [boardSize, setBoardSize] = useState(700);
  const chessGame = game;

  // get the move options for a square to show valid moves
  function getMoveOptions(square: Square) {
    // get the moves for the square
    const moves = chessGame.moves({
      square,
      verbose: true,
    });

    // if no moves, clear the option squares
    if (moves.length === 0) {
      setOptionSquares({});
      return false;
    }

    // create a new object to store the option squares
    const newSquares: Record<string, React.CSSProperties> = {};

    // loop through the moves and set the option squares
    for (const move of moves) {
      newSquares[move.to] = {
        background:
          chessGame.get(move.to) &&
          chessGame.get(move.to)?.color !== chessGame.get(square)?.color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)" // larger circle for capturing
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        // smaller circle for moving
        borderRadius: "50%",
      };
    }

    // set the square clicked to move from to yellow
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };

    // set the option squares
    setOptionSquares(newSquares);

    // return true to indicate that there are move options
    return true;
  };

  function handleSquareClick({ square, piece }: SquareHandlerArgs) {
    // piece clicked to move
    if (!moveFrom && piece) {
      // get the move options for the square
      const hasMoveOptions = getMoveOptions(square as Square);

      // if move options, set the moveFrom to the square
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      // return early
      return;
    }

    // square clicked to move to, check if valid move
    const moves = chessGame.moves({
      square: moveFrom as Square,
      verbose: true,
    });
    const foundMove = moves.find((m) => m.from === moveFrom && m.to === square);

    // not a valid move
    if (!foundMove) {
      // check if clicked on new piece
      const hasMoveOptions = getMoveOptions(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      setMoveFrom(hasMoveOptions ? square : "");

      // return early
      return;
    }

    // is normal move
    try {
      handleSquareClickMove(moveFrom, square);
    } catch {
      // if invalid, setMoveFrom and getMoveOptions
      const hasMoveOptions = getMoveOptions(square as Square);

      // if new piece, setMoveFrom, otherwise clear moveFrom
      if (hasMoveOptions) {
        setMoveFrom(square);
      }

      // return early
      return;
    }
    // clear moveFrom and optionSquares
    setMoveFrom("");
    setOptionSquares({});
  };

  const handleSquareClickMove = (moveFrom: string, square: string) => {
    if (!square) return false;
    return onClick(moveFrom, square);
  };

  const handleDrop = ({ sourceSquare, targetSquare }: PieceDropHandlerArgs) => {
    if (!targetSquare) return false;
    return onDrop(sourceSquare, targetSquare);
  };

  // set the chessboard options
  const chessboardOptions = {
    onPieceDrop: handleDrop,
    onSquareClick: handleSquareClick,
    position: fen,
    squareStyles: optionSquares,
    id: "",
  };

  // render the chessboard
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div
        className="flex justify-center items-center rounded-2xl shadow-lg overflow-hidden"
        style={{ width: boardSize, height: boardSize }}
      >
        <Chessboard options={chessboardOptions} />
      </div>
    </div>
  );
}
