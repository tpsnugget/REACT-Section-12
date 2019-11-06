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
    this.state = {
      hasWon: false,
      board: this.createBoard()
    }
    this.createBoard = this.createBoard.bind(this)
    this.flipCellsAround = this.flipCellsAround.bind(this)
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = []


    // TODO: create array-of-arrays of true/false values
    for (var i = 0; i < this.props.nrows; i++) {
      let row = []
      for (var j = 0; j < this.props.ncols; j++) {
        row.push(Math.random() < this.props.chanceLightStartsOn ? true : false)
      }
      board.push(row)
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {

    let { ncols, nrows } = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);

    flipCell(y, x)
    flipCell(y - 1, x)
    flipCell(y + 1, x)
    flipCell(y, x - 1)
    flipCell(y, x + 1)

    function flipCell(y, x) {
      // if this coord is actually on board, flip it

      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
      // See multiple function calls above
      // if (x >= 0 && x < ncols && y - 1 >= 0 && y < nrows) {
      //   board[y - 1][x] = !board[y - 1][x];
      // }
      // if (x >= 0 && x < ncols && y >= 0 && y + 1 < nrows) {
      //   board[y + 1][x] = !board[y + 1][x];
      // }
      // if (x - 1 >= 0 && x < ncols && y >= 0 && y < nrows) {
      //   board[y][x - 1] = !board[y][x - 1];
      // }
      // if (x >= 0 && x + 1 < ncols && y >= 0 && y < nrows) {
      //   board[y][x + 1] = !board[y][x + 1];
      // }
    }

    // TODO: flip this cell and the cells around it
    // this.setState({
    //   board: board
    // })

    // win when every cell is turned off
    // TODO: determine is the game has been won
    // let hasWon = board.every(row => row.every(cell => !cell))

    let hasWon = false
    let count = 0
    for (var i = 0; i < this.props.nrows; i++) {
      for (var j = 0; j < this.props.ncols; j++) {
        count += (board[i][j] === true ? 1 : 0)

      }
    }
    console.log(count)
    hasWon = (count > 0 ? false : true)
    count > 0 ? console.log("No win yet") : console.log("You Win!!")
    
    this.setState({ board, hasWon });




  }


  /** Render game board or winning message. */
  render() {

    if(this.state.hasWon){return <h1>Winner!!</h1>}

    let tblBoard = []
    for (var i = 0; i < this.props.nrows; i++) {
      let row = []
      for (var j = 0; j < this.props.ncols; j++) {
        let coord = `${i}-${j}`
        row.push(<Cell key={coord} coord={coord} isLit={this.state.board[i][j]} flipCellsAroundMe={this.flipCellsAround} />)
      }
      tblBoard.push(<tr key={i}>{row}</tr>)
    }

    return (
      <table className="Board">
        <tbody>
          {tblBoard}
        </tbody>
      </table>
    )
    // if the game is won, just show a winning msg & render nothing else

  }
}

export default Board;
