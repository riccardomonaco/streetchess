"use client";

import { Chess, Move } from "chess.js";

export default class ChessGame {
  private engine: Chess;

  constructor(fen?: string) {
    this.engine = new Chess(fen);
  }

  get fen() {
    return this.engine.fen();
  }

  get moves(): Move[] {
    return this.engine.history({ verbose: true });
  }

  get turn() {
    return this.engine.turn();
  }

  move(from: string, to: string, promotion = "q"): boolean {
    const result = this.engine.move({ from, to, promotion });
    return result !== null;
  }

  undo(): void {
    this.engine.undo();
  }

  reset(): void {
    this.engine.reset();
  }

  isGameOver() {
    return this.engine.isGameOver();
  }

  clone(): ChessGame {
    return new ChessGame(this.engine.fen());
  }

  getEngine(): Chess {
    return this.engine;
  }
}
