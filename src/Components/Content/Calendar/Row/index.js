import React from 'react'
import './styles.css'
import Cell from './Cell/index'

class Row extends React.Component{

    showCells(data) {
        return data.map(el => {
            return <Cell date={el} cellClickCell={this.props.cellClickRow} key={el} dataKey={el}/>
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