"use client";

import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard, PieceDropHandlerArgs } from 'react-chessboard';
import ChessGameComponent from './ChessGameComponent';

type ChessboardComponentProps = {
  onDrop: ({ sourceSquare, targetSquare, piece }: PieceDropHandlerArgs) => boolean
};

export default function ChessboardComponent({ onDrop }: ChessboardComponentProps) {
  const [showAnimations, setShowAnimations] = useState(true);
  const [position, setPosition] = useState('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR');
  const [boardSize, setBoardSize] = useState(400)
  const chessboardOptions = {
      position,
      showAnimations,
      id: 'position',
      onPieceDrop: onDrop
    };
  
    useEffect(() => {
      const handleResize = () => {
        // Adatta le dimensioni alla viewport
        const size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.8, 600);
        setBoardSize(size);
      };

      handleResize(); // Imposta dimensione iniziale
      window.addEventListener('resize', handleResize);
      
      return () => window.removeEventListener('resize', handleResize);
    }, []);

  return (
    <div className="flex justify-center items-center w-full h-full">
      <div 
        className="flex justify-center items-center"
        style={{ width: boardSize, height: boardSize }}
      >
        <Chessboard options={chessboardOptions} />
      </div>
    </div>
  );
}