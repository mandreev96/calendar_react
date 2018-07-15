import React from 'react'
import './styles.css'

class Cell extends React.Component{
    render() {
        return(
            <div className='cell' onClick={this.props.cellClickCell}>
                {this.props.date}
            </div>
        )
    }
}

export default Cell