import React from 'react'
import './styles.css'
import Cell from './Cell/index'
import moment from 'moment'

class Row extends React.Component{

    constructor(props) {
        super(props)
    }

    nowDay = parseInt(moment().format('DD'))

    showCells(data) {
        return data.map(el => {
            if (el != this.nowDay) {
                return <Cell date={el} cellClickCell={this.props.cellClickRow} key={el} dataKey={el} />
            } else {
                return <Cell date={el} cellClickCell={this.props.cellClickRow} key={el} dataKey={el} sendNowDay={this.props.sendNowDay}/>
            }
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