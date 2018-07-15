import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import './styles.css'

class BasicRow extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className='basicRow' onClick={this.props.clickOnRow} id={`taskNum-${this.props.idBasicRow}`}>
                {this.props.taskText}
                <span>{this.props.time}</span>
            </div>
        )
    }

}

export default BasicRow