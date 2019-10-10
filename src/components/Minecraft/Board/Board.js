import React, {Component} from 'react';
import './style.scss';
import helper from '../../../misc/helper';
import Row from './Row';

class Board extends Component{
  constructor(props){
    super(props);
    const {board} = this.props;
    this.state = {
      board: helper.initializeBoard(board.board) || [],
      history: [],
      redos: [],
      isWinner: false
    }
    this.renderBoard    =   this.renderBoard.bind(this);
    this.checkCell      =   this.checkCell.bind(this);
    this.validateBoard  =   this.validateBoard.bind(this);
    this.undo           =   this.undo.bind(this);
    this.redo           =   this.redo.bind(this);
    this.reset          =   this.reset.bind(this);
  }
  componentDidUpdate(prevProps){
    if(prevProps.board!==this.props.board)
      this.setState({board: this.props.board});
  }
  checkCell(cell){ //toggle Cell::isChk
    let newBoard = this.state.board.map((row,i) => row.map((c,j) => {
      return (cell.row===c.row && cell.col===c.col) ? {...c, 'isChk': !c.isChk} : c;
    }));

    newBoard = this.validateBoard(newBoard);
    const isWinner = helper.chkForWin(newBoard);
    const history  = [this.state.board, ...this.state.history];
    this.setState({board: newBoard, isWinner, history, redos: []});
  }
  validateBoard(tmpBoard){
    const newBoard = tmpBoard.map(row => row.map(cell => {
      const counterChkCells = helper.countCheckedNeighbors(tmpBoard, cell);
      return {...cell, 'isValid': (counterChkCells<=cell.value && cell.value>0)}
    }));
    return newBoard;
  }
  undo(){
    if(this.state.history.length===0) return;
    const board     =   this.state.history[0];
    const history   =   this.state.history.filter((_,i) => i!==0);
    const redos     =   [this.state.board, ...this.state.redos];
    this.setState({board, history, redos});
  }
  redo(){
    if(this.state.redos.length===0) return;
    const board     =   this.state.redos[0];
    const redos     =   this.state.redos.filter((_,i) => i!==0);
    const history   =   [this.state.board, ...this.state.history];
    this.setState({board, redos, history});
  }
  reset(){
    this.setState({
      board: helper.initializeBoard(this.props.board.board) || [],
      history: [],
      redos: [],
      isWinner: false
    })
  }
  renderBoard(){
    const {board} = this.state;
    return board.map((row,i) => <Row key={i} row={row} checkCell={this.checkCell}/>)
  }
  render(){
    const {history, redos, isWinner} = this.state;
    return(
      <div className='Board'>
        <div className={`winner ${isWinner && 'visible'}`}>Congratulations! You Win!</div>
        <table>
          <tbody>
            {this.renderBoard()}
          </tbody>
        </table>
        <div className='options'>
            <button onClick={this.undo} disabled={history.length===0}>undo</button>
            <button onClick={this.reset}>reset</button>
            <button onClick={this.redo} disabled={redos.length===0}>redo</button>
        </div>
      </div>
    );
  }
}

export default Board;
