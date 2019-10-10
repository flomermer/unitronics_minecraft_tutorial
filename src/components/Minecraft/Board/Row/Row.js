import React  from 'react';
import './style.scss';
import Cell from './Cell';

const Row = ({row, checkCell}) => {
  return (
    <tr className='Row'>
      {row.map((cell,i) => <Cell key={i} cell={cell} checkCell={checkCell} />)}
    </tr>
  );
}

export default Row;
