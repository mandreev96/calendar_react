import React from 'react'
import './styles.css'

class Cell extends React.Component{
    render() {
        return(
            <div className='cell' onClick={this.props.cellClickCell} data-key={this.props.dataKey} ref={this.props.sendNowDay}>
                {this.props.date}
            </div>
        )
    }
}

export default Cell