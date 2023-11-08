import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 7, ncols = 7, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    // TODO: create array-of-arrays of true/false values
    let initialBoard = [];
    for (let i = 0; i < nrows; i++) {
      let row = [];
      for (let j = 0; j < ncols; j++) {
        row.push(Boolean(j % 2));
      }
      initialBoard.push(row);
    }

    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let i = 0; i < nrows; i++) {
      for (let j = 0; j < ncols; j++) {
        if (board[i][j] === false) {
          return false;
        }
      }
    }
    return true;
  }

  function flipCellsAround(y, x) {
    setBoard((oldBoard) => {
      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let deepCopy = JSON.parse(JSON.stringify(oldBoard));

      // TODO: in the copy, flip this cell and the cells around it
      // here we flip the cell where we click
      flipCell(y, x, deepCopy);
      // here we flip the cell above
      flipCell(y - 1, x, deepCopy);
      // here we flip the cells below
      flipCell(y + 1, x, deepCopy);
      // here we flip the ones on the left
      flipCell(y, x - 1, deepCopy);
      // here we flip the ones on the right
      flipCell(y, x + 1, deepCopy);
      // TODO: return the copy
      return deepCopy;
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return "You Won";
  }

  // make table board

  return (
    <table>
      {board.map((row, y) => (
        <tr key={y}>
          {row.map((cell, x) => (
            <Cell
              key={x}
              isLit={cell}
              flipCellsAroundMe={() => flipCellsAround(y, x)}
            />
          ))}
        </tr>
      ))}
    </table>
  );
}

export default Board;
