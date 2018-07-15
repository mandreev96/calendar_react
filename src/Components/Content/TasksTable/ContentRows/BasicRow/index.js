import React from 'react'
import 'font-awesome/css/font-awesome.min.css'
import './styles.css'
import moment from 'moment'

class BasicRow extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <div className='basicRow' onClick={this.props.clickOnRow}>
                {this.props.taskText}
                <span>{this.props.selDay}/{this.props.selMonth}</span>
            </div>
        )
    }

}

export default BasicRow