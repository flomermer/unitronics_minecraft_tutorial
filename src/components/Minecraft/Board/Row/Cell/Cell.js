import React from 'react';
import './style.scss';

const Cell = ({cell, checkCell}) => {
  const {value, isChk, isValid} = cell;
  return (
    <td className={`Cell ${isChk && 'checked'} ${!isValid && 'invalid'}`} onClick={() => checkCell(cell) }>
      {value>-1 && value}
    </td>
  );
}

export default Cell;
