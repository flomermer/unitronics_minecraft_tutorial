const helper = {
  initializeBoard: (board) => {
    return board.map((row,i) => row.map((cell,j) => {
      return {row: i, col: j, isChk: false, isValid: true, value: cell};
    }))
  },
  countCheckedNeighbors: (board, cell) => {
    const {row, col} = cell;
    const includeItself = true;
    let counter = 0;

    if(board[row-1]){
      board[row-1][col]     &&    board[row-1][col].isChk       &&   ++counter;
      board[row-1][col-1]   &&    board[row-1][col-1].isChk     &&   ++counter;
      board[row-1][col+1]   &&    board[row-1][col+1].isChk     &&   ++counter;
    }
    if(board[row+1]){
      board[row+1][col]     &&    board[row+1][col].isChk       &&   ++counter;
      board[row+1][col-1]   &&    board[row+1][col-1].isChk     &&   ++counter;
      board[row+1][col+1]   &&    board[row+1][col+1].isChk     &&   ++counter;
    }
    if(board[row]){ //not really needs the IF. only for Order.
      board[row][col-1]   &&    board[row][col-1].isChk         &&   ++counter;
      board[row][col+1]   &&    board[row][col+1].isChk         &&   ++counter;
      board[row][col]     &&    board[row][col].isChk           &&   includeItself  &&  ++counter;
    }

    return counter;
  },
  chkForWin: function(board){ //not ES6 -> to bind THIS
    let isWinner = true;
    board.forEach(row => {
      row.forEach(cell => {
        if (this.countCheckedNeighbors(board, cell)!==cell.value && cell.value>0)
          isWinner = false;
      })
    })
    return isWinner;
  }
}

export default helper;
