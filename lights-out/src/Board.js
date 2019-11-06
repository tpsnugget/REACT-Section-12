import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


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
 * - hasWon: boolean, true when board is all off
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

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn: 0.25,
  }

  constructor(props) {
    super(props);

    // TODO: set initial state
    this.createBoard = this.createBoard.bind(this)
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = []


    // TODO: create array-of-arrays of true/false values
    for (var i = 0; i < this.props.nrows; i++) {
      let row = []
      for (var j = 0; j < this.props.ncols; j++) {
        if (Math.random() < this.props.chanceLightStartsOn) { row.push(1) }
        else { row.push(0) }
      }
      board.push(row)
    }
    console.log(board)
    board.map((e, index) => console.log(e, index))
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // =========================================================================
    // Giebner commented this out to remove initial failure to compile
    // Now we compile
    // this.setState({board, hasWon});
  }

  
  /** Render game board or winning message. */
  render() {
    var board = this.createBoard()
    return (
      <table className="Board">
        <tbody>
          {/* <tr>{board.flatMap((e,index) => <Cell key={`0-${index}`} isLit={e} />)}</tr> */}
          <tr>{board[0].map((e,index) => <Cell key={`0-${index}`} isLit={e} />)}</tr>
          <tr>{board[1].map((e,index) => <Cell key={`1-${index}`} isLit={e} />)}</tr>
          <tr>{board[2].map((e,index) => <Cell key={`2-${index}`} isLit={e} />)}</tr>
          <tr>{board[3].map((e,index) => <Cell key={`3-${index}`} isLit={e} />)}</tr>
          <tr>{board[4].map((e,index) => <Cell key={`4-${index}`} isLit={e} />)}</tr>
        </tbody>
      </table>
    )
    // if the game is won, just show a winning msg & render nothing else

    // TODO

    // make table board

  }
}

export default Board;
