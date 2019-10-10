import React, {Component} from 'react';
import './style.scss';
import STATIC_DATA from '../../misc/static_data';
import Board from './Board';

class Minecraft extends Component{
  render(){
    return(
      <div className='Minecraft'>
        <Board board={STATIC_DATA[0]} />
      </div>
    );
  }
}

export default Minecraft;
