import React from 'react'
import './styles.css'
import Cell from './Cell/index'

class Row extends React.Component{

    showCells(date) {
        return date.map(el => {
            return <Cell date={el} cellClickCell={this.props.cellClickRow}/>
        })
    }

    render() {
        return (
            <div className='row'>
                {this.showCells(this.props.date)}
            </div>
        )
    }


}
export default Row