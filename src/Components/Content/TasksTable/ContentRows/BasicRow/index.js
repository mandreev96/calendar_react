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
                {this.props.inputText}
                <span>{this.props.nameDay}</span>
                <span>{moment().format('LT')}</span>
                <span>{this.props.showDay}/{this.props.showMonth+1}/{this.props.showYear}</span>
            </div>
        )
    }

}

export default BasicRow