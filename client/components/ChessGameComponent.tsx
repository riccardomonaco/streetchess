"use client";

import { useState } from "react";
import { Chess } from "chess.js";
import ChessboardComponent from "./ChessboardComponent";
import { PieceDropHandlerArgs } from "react-chessboard";

export default function ChessGameComponent(){
    
    const [game, setGame] = useState(new Chess());

    /** Funzione per aggiornare lo stato del gioco, ogni mossa
    *
    * @param  game L'attuale oggetto rappresentante la partita
    * @return      L'oggetto rappresentate la partita aggiornato
    */ 
    function safeGameMutate(modify: (game: Chess) => void) {
        setGame((g) => {
        const updated = new Chess(g.fen());
        modify(updated);
        return updated;
        });
    }

    /** Funzione per verificare la validita della mossa e muovere
     * 
     * @param sourceSquare 
     * @param targetSquare 
     */
    function onDrop({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs): boolean {

        if (!targetSquare) return false;

        const move = { from: sourceSquare, to: targetSquare, promotion: "q" };
        let moveResult = null;

        try{
            
            safeGameMutate((game) => {
            moveResult = game.move(move);
            });

        }catch(e){ console.log(e)}

        if (moveResult === null) return false;
        return true;
    }

      return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <ChessboardComponent onDrop={onDrop}/>
    </div>
  );

}

/**
 * "use client";

import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard, PieceDropHandlerArgs } from "react-chessboard";

export default function GamePage() {
  const [game, setGame] = useState(new Chess());

  function onDrop({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs): boolean {
    const newGame = new Chess(game.fen());
    const move = newGame.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false;
    setGame(newGame);
    return true;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <Chessboard
        boardPosition={game.fen()}  // 👈 usa questo nome
        onPieceDrop={onDrop}
        boardWidth={500}
      />
    </div>
  );
}

 */